import { RampartToken } from "../auth/tokenVerify";
import { User } from "../models/user";

export interface LiteUser {
  id: number,
  g_id: string,
  first_name: string,
  last_name: string,
  nine_hundred: number | undefined,
  admin: boolean
}

/**
 * Given a user's google id or database id looks them up
 * @param idOrGoogleId The id or google id
 * @returns A user object if one exsts
 */
export async function getUser(idOrGoogleId: string): Promise<User | undefined> {
  const id = idOrGoogleId;
  try {
    let user: User | undefined = undefined;
    if (parseInt(id) < Math.pow(2, 31)) {
      user = (await User.query().where('id', id).orWhere('g_id', id))[0];
    } else {
      user = (await User.query().where('g_id', id))[0];
    }
    return user;
  } catch (err) {
    console.error(err);
  }
  return;
}

export async function getLiteUser(idOrGoogleId: string): Promise<LiteUser | undefined> {
  const user = await getUser(idOrGoogleId);
  if (user) {
    return {
      id: user.id,
      g_id: user.g_id,
      first_name: user.first_name,
      last_name: user.last_name,
      nine_hundred: user.nine_hundred,
      admin: user.admin
    }
  }
  return;
}

/**
 * Given a user id returns whether or not they're an admin
 * @param idOrGoogleId The users google id or database id
 * @returns A boolean indicating admin or not
 */
export async function isAdmin(idOrGoogleId: string): Promise<boolean>;
/**
 * Given a rampart token indicates whether it is an admin token (i.e. belongs to a service or an admin user)
 * @param token The token to check against
 * @returns A boolean indicating admin or not
 */
export async function isAdmin(token: string | RampartToken): Promise<boolean>;
export async function isAdmin(tokenOrId: RampartToken | string): Promise<boolean> {
  const id = typeof tokenOrId === 'string' ? tokenOrId : tokenOrId.googleId;
  if (id) {
    return (await getUser(id))?.admin ?? false;
  } else {
    return (tokenOrId as RampartToken).isService;
  }
}

/**
 * Given two ids whether in the form of google or user ids, decides if it's the same user
 * @param id1 The first google id or database id
 * @param id2 The second google id or database id
 * @returns A boolean indicating whether they belong to the same user or not
 */
export async function isSelf(id1: string, id2: string): Promise<boolean>;
/**
 * Given a google id / user id and a token determines if they belong to the same user
 * @param id1 The google id or database id
 * @param token The token to check against
 * @returns A boolean indicating admin or not
 */
export async function isSelf(id1: string, token: string | RampartToken): Promise<boolean>;
export async function isSelf(id1: string, tokenOrId: RampartToken | string): Promise<boolean> {
  // Might seem counter-inuitive to have user 2 first but can save us a database lookup if it's a service token
  const user2id = typeof tokenOrId === 'string' ? tokenOrId : tokenOrId.googleId;
  if (!user2id) {
    return false;
  }
  const user1 = await getUser(id1);
  const user2= await getUser(user2id);
  // Compare id and google id. They both should be unique so this is more than enough to say if they're the same user
  return user1?.id === user2?.id && user1?.g_id === user2?.g_id;
}

import { User } from "../models/user";

export interface LiteUser {
  id: number,
  g_id: string,
  first_name: string,
  last_name: string,
  nine_hundred: number | undefined,
  admin: boolean
}

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

export async function isAdmin(idOrGoogleId: string): Promise<boolean> {
  return (await getUser(idOrGoogleId))?.admin ?? false;
}
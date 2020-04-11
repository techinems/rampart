const express = require('express');
//const sequelize = require('sequelize');
const {QueryTypes} = require('sequelize');
//Hard code


module.exports = db => {
    const router = express.Router();

    const userModel = db.model('users');
    const credentialModel = db.model('credentials');
    const userCredentialModel = db.model('users_credentials')
    const checklistItemModel = db.model('checklist_items')


    // Get all credentials
    router.get('/', async (req, res) => {
        results = await credentialModel.findAll()

        for (let r of results){
            r.dataValues['parentCredName'] = await credentialModel.findOne({
                where: {
                    id: r.parent_cred
                }
            }).then(r=>r.name);

            r.dataValues['createdByUserName'] = await userModel.findOne({
                where: {
                    id: r.created_by
                }
            }).then(r=>{
                return {'last_name': r.last_name,
                        'first_name': r.first_name}
            });
        }
        res.send(results)
    });

    router.get('/:credentialID', async (req, res) => {

        result = await credentialModel.findOne({
                    where: {
                            id: req.params.credentialID
                        }
        }).then(async (r) => {
            checklist_items = await checklistItemModel.findAll({
                where:{
                    credential_id: req.params.credentialID
                }
            })
            r.dataValues['checklist_items'] = checklist_items
            return r
        })

        const parent_cred_name = await credentialModel.findOne({
            where: {
                id: result.parent_cred
            }
        }).then(r=>r.name);

        create_by_name = await userModel.findOne({
            where: {
                id: result.created_by
            }
        }).then(r=>{
            return {'last_name': r.last_name,
                    'first_name': r.first_name}
        });

        result.dataValues['parentCredName'] = parent_cred_name;
        result.dataValues['createdByUserName'] = create_by_name;
        res.send(result.dataValues);

    });

    router.get('/user/:userId', async(req, res) =>{
        console.log(" -----> Get user credential");
        var user_own_credential = await db.query("\
                                        SELECT name, credential_id \
                                        FROM \
                                            credentials \
                                        JOIN \
                                            users_credentials \
                                        ON credentials.id = users_credentials.credential_id \
                                        WHERE users_credentials.user_id = (:user_id) \
                                        AND active = true ",
                                        {
                                            replacements: {user_id: Number(req.params.userId)},
                                            type: QueryTypes.SELECT
                                        })
                                        .then(credentials => {
                                            credentials.forEach(function(credential){
                                                credential['status'] = 'Available'
                                            });
                                            return credentials;
                                        });
        console.log(user_own_credential)
        console.log(" -----> finish one user credential");

        var user_ongoing_crendential = await db.query("\
        SELECT name, ongoing_credential_id.credential_id \
        FROM \
            credentials \
        JOIN( \
            SELECT cred_req_num.credential_id, \
                   cred_req_num.num as total_num, \
                   user_cred_req_num.num as current_num \
            FROM( \
                SELECT credential_id, count(check_id) as num \
                FROM \
                    (SELECT credential_id, checklist_items.id as check_id \
                    FROM \
                        credentials \
                    JOIN \
                        checklist_items \
                    ON credentials.id = checklist_items.credential_id \
                    WHERE checklist_items.active = true) cred_check_name \
                GROUP BY credential_id) cred_req_num \
            LEFT JOIN( \
                SELECT credential_id, count(checklist_item_id) as num \
                FROM( \
                    SELECT credential_id, checklist_item_id \
                    FROM \
                        users_checklist_items \
                    JOIN \
                        checklist_items \
                    ON  checklist_items.id = users_checklist_items.checklist_item_id \
                    WHERE users_checklist_items.user_id = 2 \
                    AND checklist_items.active = true \
                    AND users_checklist_items.active = true) user_cred_check_name \
                GROUP BY credential_id) user_cred_req_num \
            ON cred_req_num.credential_id = user_cred_req_num.credential_id) ongoing_credential_id \
        ON ongoing_credential_id.credential_id = credentials.id \
        AND ongoing_credential_id.total_num <> ongoing_credential_id.current_num \
        ",
        {
            replacements: {user_id: req.params.userId},
            type: QueryTypes.SELECT
        }).then((credentials) => {
            credentials.forEach(function(credential){
                credential['status'] = 'Ongoing'
            });
            return credentials;
        });

        console.log('own credentials', user_own_credential)
        console.log('ongoing_credentials', user_ongoing_crendential)
        var user_credential = user_own_credential.concat(user_ongoing_crendential)
        res.send(user_credential)
        }
    );

    // post to create a credential
    router.post('/', async (req, res) =>{
        console.log("-----> Request body : ", req.body);
        await credentialModel.create({
            'name': req.body['name'],
            'abbr': req.body['abbr'],
            'major_cred' : req.body['major_cred'],
            'parent_cred' : req.body['parent_cred'],
            'active' : true,
            'created_by': req.body['created_by'],
        }).then((result) => {
            res.send({'isSuccess': true,
                    'msg':'credential successfully created'})
        }).catch((result) =>{
            res.send({'isSuccess': false,
                    'msg':'credential is not successfully created'})
        });
    });

    // post to create a user credential at the beginning
    router.post('/user', async (req, res) =>{
        console.log("-----> Request body : ", req.body);
        await userCredentialModel.create({
            'user_id': req.body.user_id,
            'credential_id': req.body.credential_id,
            'active' : false,
            'created_by': req.body.created_by,
        }).then((result) => {
            res.send({'isSuccess': true,
                    'msg':'User credential successfully created'})
        }).catch((result) =>{
            res.send({'isSuccess': false,
                    'msg':'User credential is not successfully created'})
        });
    });


    //post to create a credential checklist_item

    router.post('/checklistItems/', async (req, res) => {
        console.log("-----> Request body : ", req.body);
        await checklistItemModel.create({
            'credential_id': req.body['credential_id'],
            'text': req.body['text'],
            'active' : true,
            'created_by': req.body['created_by']
        }).then((result) => {
            res.send({'isSuccess': true,
                    'msg':'credential checklist item successfully created'})
        }).catch((result) =>{
            res.send({'isSuccess': false,
                    'msg':'credential checklist item  is not successfully created'})
        });
    });

    // put to update a credential
    router.put('/', async (req, res) =>{
        console.log("-----> Request body : ", req.body);
        const to_update_id = req.body['credential_id']
        delete req.body['credential_id']
        await credentialModel.update(req.body,
            {
                where: {id: to_update_id}
            }
        ).then((result) => {
            res.send({'isSuccess': true,
                      'msg':'credential successfully updated'})
        }).catch((result) =>{
            res.send({'isSuccess': false,
                    'msg':'credential is not successfully updated'})
        });
    });

    // put to update a credential of a user
    router.put('/user', async (req, res) =>{
        console.log("-----> Request body : ", req.body);
        await userCredentialModel.update(req.body,
            {
                where: {credential_id: req.body.credential_id,
                        user_id: req.body.user_id}
            }
        ).then((result) => {
            res.send({'isSuccess': true,
                      'msg':'User credential successfully updated'})
        }).catch((result) =>{
            res.send({'isSuccess': false,
                    'msg':'User credential is not successfully updated'})
        });
    });

    return router;
};

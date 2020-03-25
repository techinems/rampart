const express = require('express');
const { QueryTypes } = require('sequelize');


module.exports = db => {
    const router = express.Router();

    const credentialModel = db.model('credentials');
    const checklistItemModel = db.model('checklist_items')


    // Get all credentials
    router.get('/', async (req, res) => res.json(await credentialModel.findAll()));

    router.get('/:userId', async(req, res) =>{

        var user_own_credential = await sequelize.query("\
                                        SELECT name, credential_id \
                                        FROM \
                                            credentials \
                                        JOIN \
                                            users_credentials \
                                        ON credentials.id = users_credentials.crendential_id \
                                        WHERE users_credentials.user_id = (:user_id) \
                                        AND active = true",
                                        {
                                            replacements: {user_id: req.params.userId},
                                            type: QueryTypes.SELECT
                                        }).then((credentials) => {
                                            credential.array.forEach(function(credential){
                                                credential['status'] = 'Available'
                                            });
                                            return credentials;
                                        });

        var user_ongoing_crendential = await sequelize.query("\
                        SELECT name, cred_req_num.credential_id \
                        FROM \
                            credentials \
                        JOIN( \
                            SELECT credential_id \
                            FROM( \
                                SELECT name, credential_id, count(checklists_items.id) as num\
                                FROM \
                                    credentials \
                                JOIN \
                                    checklists_items \
                                ON credentials.id = checklists_items.crendential_id \
                                WHERE checklist_items.active = true\
                                GROUP BY credentials.id) cred_req_num \
                            JOIN( \
                                SELECT credential_id, count(checklists_items.id) as user_num \
                                FROM \
                                    users_checklists_items \
                                JOIN \
                                    checklists_item \
                                ON  users_checklists_items.id = users_checklists_items.checklist_item_id \
                                WHERE users_checklists_items.user_id = (:userId) \
                                AND checklist_items.active = true \
                                AND users_checklist_items.active = true \
                                GROUP BY credential_id ) user_cred_req_num \
                                ON cred_req_num.credential_id = user_cred_req_num.credential_id \
                            WHERE num <> user_num AND user_num > 0) ongoing_credential_id \
                        ON ongoing_credential_id.credential_id = credentials.id",
                        {
                            replacements: {user_id: req.params.userId},
                            type: QueryTypes.SELECT
                        }).then((credentials) => {
                            credential.array.forEach(function(credential){
                                credential['status'] = 'Ongoing'
                            });
                            return credentials;
                        });
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
            'updated_by': 0
        }).then((result) => {
            res.send({'isSuccess': true,
                    'msg':'credential successfully created'})
        }).catch((result) =>{
            res.send({'isSuccess': false,
                    'msg':'credential is not successfully created'})
        });
    });

    //post to create a credential checklist_item

    router.post('/:credentialId', async (req, res) => {
        console.log("-----> Request body : ", req.body);
        await checklistItemModel.create({
            'credential_id': req.params.credentialId,
            'text': req.body['text'],
            'active' : true,
            'created_by': req.body['created_by'],
            'updated_by': 0
        }).then((result) => {
            res.send({'isSuccess': true,
                    'msg':'credential checklist item successfully created'})
        }).catch((result) =>{
            res.send({'isSuccess': false,
                    'msg':'credential checklist item  is not successfully created'})
        });
    });

    // put to update a credential
    router.put('/:credentialId', async (req, res) =>{
        console.log("-----> Request body : ", req.body);
        await credentialModel.update(req.body,
            {
                where: {id: req.params.credentialId}
            }
        ).then((result) => {
            res.send({'isSuccess': true,
                      'msg':'credential successfully updated'})
        }).catch((result) =>{
            res.send({'isSuccess': false,
                    'msg':'credential is not successfully updated'})
        });
    });

    return router;
};

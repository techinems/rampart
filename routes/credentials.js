const express = require('express');
const { QueryTypes } = require('sequelize');


module.exports = db => {
    const router = express.Router();

    const credentialModel = db.model('credential');



    // Get all credentials
    router.get('/', async (req, res) => res.json(await credentialModel.findAll()));

    // // Get a user credential status TODO !!!

    // // def get_user_credential_status(operator, user_id):
    // // """Heres are two status here
    // //     1. Completed
    // //     2. Ongoing
    // // """
    // // all_credentials = get_all_credentials(operator)
    // // user_credential_query = """
    // //                             SELECT credential_id
    // //                             FROM user_credentials
    // //                             WHERE user_id = %s
    // //                             AND active = true
    // //                         """

    // // ongoing_checklist_query = """
    // //                             SELECT credential_id,
    // //                             FROM
    // //                                 user_checklist_items
    // //                             JOIN
    // //                                 checklist_items
    // //                             ON user_checklist_items.checklist_item_id = checklist_items.id
    // //                             WHERE checklist_items.active = true
    // //                             AND user_checklist_items.user_id = %s
    // //                         """

    // // user_credentials = operator.query(user_credential_query, (user_id,))
    // // user_credentials = set([cred[0] for cred in user_credentials])

    // // user_ongoing_credentials = operator.query(ongoing_checklist_query, (user_id,))
    // // ongoing_credentials = set([cred[0] for cred in user_ongoing_credentials])

    // // credential_status = []
    // // for cred in all_credentials:
    // //     if cred['credential_id'] in user_credentials:
    // //         cred['status'] = 'completed'
    // //     if cred['credential_id'] in ongoing_credentials:
    // //         cred['status'] = 'ongoing'
    // //     credential_status.append(cred)

    // // return {"isSuccessful": True,
    // //         "message": "Get user credentials successfully",
    // //         "credential_status": credential_status}

    // router.get('/:userId', async(req, res) =>{

    //     const

    //     if (!targetUser){
    //         res.send({'isSuccess': false,
    //                   'msg':'Invalid email or password'})
    //     } else {
    //         var date = new Date();
    //         var current_stamp = date.getTime();
    //         userModel.update(
    //             {last_login: current_stamp},
    //             {
    //                 where: {id: targetUser.id}
    //             }
    //         )
    //         targetUser['isSuccess'] = true;
    //         res.send(targetUser)
    //     }
    // });

    // post to create a credential
    router.post('/', async (req, res) =>{
        console.log("-----> Request body : ", req.body);
        credentialModel.create({
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

    // put to update a credential
    router.put('/', async (req, res) =>{
        console.log("-----> Request body : ", req.body);
        var data = req.body;
        await credentialModel.update(
            data,
            {
                where: {id: data['id']}
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

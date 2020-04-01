const express = require('express');
const { QueryTypes } = require('sequelize');


module.exports = db => {
    const router = express.Router();

    const checklistItemModel = db.models('checklist_items')
    const credentialModel = db.model('credentials');
    const userChecklistItemModel = db.model('users_checklist_items');
    const userCredentialModel = db.model('users_credentials')
    //const individualChecklistItems = db.model('individual_checklist_items');

    // start a new route
    router.post('/', async (req, res) =>{

        await checklistItemModel.findAll({
            where: {credential_id: req.body.credentialId,
                    active: false
            }}).then(result => {result.forEach(checklist => {
                userChecklistItemModel.findOne({where:{
                    'user_id': req.body.userId,
                    'checklist_item_id': checklist.id
                }}).then(result => {
                    if (!result){
                        userChecklistItemModel.create(
                            {'user_id': req.body.userId,
                            'checklist_item_id': checklist.id,
                            'active': false,
                            'trainer': req.body.trainer,
                            'created_by': req.body.created_by}
                        )
                    }
                })
            })
        })
    });

    // Update users_checklist_items
    router.put('/:userId&checklistItemId', async (req, res) => {
        await checklistItemModel.update(req.body,
            {where: {user_id: req.params.userId,
                    checklist_item_id: req.params.checklistItemId}})
    })

    //Get Detailed Progress of a Route
    async function getDetailedProgressOfARoute(user_id, credential_id){
        var checklist_items = await checklistItemModel.findAll({
            where: {
                credential_id: credential_id}
            })

        var user_checklists = await userChecklistItemModel.findAll({
                where:{
                    user_id: user_id            }
            }).then(result => result.map(r => r.checklist_item_id))

        var finished_user_checklists = await userChecklistItemModel.findAll({
            where:{
                user_id: user_id,
                active: true
            }
        }).then(result => result.map(r => r.checklist_item_id))

        checklist_items.forEach(res => {
            res['finished'] = finished_user_checklists.includes(res.id)
            res['started'] = user_checklists.includes(res.id)
        })

        return checklist_items
    }

    router.get('/:userId&:credentialId', async (req, res) => {
        var checklist_items = getDetailedProgressOfARoute(req.params.userId,
                                                          req.params.credentialId)
        res.send(checklist_items)
    });

    // Determine whether route update availability
    async function isPrerequistAvailable(user_id, credential_id){
        var parent_cred = await credentialModel.findOne({
            where: {credential_id: credential_id}
        }).then(result =>  result.parent_cred)

        var all_user_credentials = await userCredentialModel.findAll({
            where: {user_id: user_id}
        }).then(result => result.map(item => item.id));

        return all_user_credentials.includes(parent_cred)
    }

    router.get('/available/:userId&:credentialId', async(req, res) =>{

        const isAvailable = isPrerequistAvailable(req.params.userId,
                                                  req.params.credentialId)

        if (!isAvailable.includes(parent_cred)){
            res.send({'isAvailable': false, 'msg':
                     'parent credential doesn\'t exist'})
        }
        else{
            res.send({'isAvailable': true, 'msg':
                     'parent credential exist'})
        }
    })

    router.get('status/:userId&:credentialId', async (req, res) => {

        const is_complete = await userCredentialModel.findOne({
            where: {user_id: userId,
                    credential_id: credential_id}
        }).then(r => r.length)

        const is_available = isPrerequistAvailable(req.params.userId,
                                                   req.params.credentialId)

        const checklist_items = getDetailedProgressOfARoute(req.params.userId,
                                                            req.params.credentialId)

        const checklist_starts_num = checklist_items.map(r => r.started).reduce(
                                                                (a, b) => a + b, 0)
        const checklist_finishes_num = checklist_items.map(r => r.finished).reduce(
                                                                (a, b) => a + b, 0)

        checklist_num = checklist_items.length

        status = {'isAvailable': is_available,
                  'isStarted': checklist_starts_num == checklist_num,
                  'isChecklistFinished': checklist_finishes_num == checklist_num,
                  'isCompleted': is_complete}
        res.send(status);
    })

    return router;
};

const express = require('express');
const { QueryTypes } = require('sequelize');

module.exports = db => {
    const router = express.Router();

    const promoRequestModel = db.model('promo_requests');
    const promoRequestVoteModel = db.model('promo_request_votes');
    const credentialModel = db.model('credentials')
    const userModel = db.model('users')
    const userCredentialModel = db.model('users_credentials');
    const permissionModel = db.model('permissions');
    const userPermissionModel = db.model('users_permissions');

    // Get all promotions
    router.get('/', async (req, res) => res.json(
        await promoRequestModel.findAll()));

    //Get a Promotion request detail information
    router.get('/:promotionId', async(req, res) =>{

        const promotion_request = await promoRequestModel.findOne({where:
                                                    {id: req.params.promotionId}})

        const credential_name = await credentialModel.findOne({where:
                                                    {id: promotion_request.credential_id}}
                                                    ).then(r => r.name)

        const user_name = await userModel.findOne({where:
                                                    {id: promotion_request.user_id}}
                                                    ).then(r => {
                                                        return {'last_name': r.last_name,
                                                        'first_name': r.first_name}})

        const votes_results = await promoRequestVoteModel.findAll({
                where:{
                        promo_request_id: req.params.promotionId
                      }}).then(result => result.map(r => {
                                                    return {'comments': r.comments,
                                                            'vote': r.vote,
                                                            'voterUserId': r.user_id}
                                                    }))
        var details = []
        for (let res of votes_results){
            var user_name_helper = await userModel.findOne({where:
                                {id: res.voterUserId}}
                                ).then(r => {
                                        return {'last_name': r.last_name,
                                                'first_name': r.first_name}})
            res['voterUserName'] = user_name_helper
            details.push(res)
        }

        const votes = votes_results.map(r => (r.vote == true)? 1: 0).reduce(
            (a, b) => a + b, 0)
        // console.log(votes)
        const denies = votes_results.map(r => (r.vote == false)? 1: 0).reduce(
            (a, b) => a + b, 0)
        const total = votes_results.length;

        promotion_request.dataValues['userName'] = user_name
        promotion_request.dataValues['credentialName'] = credential_name
        promotion_request.dataValues['votes'] = votes
        promotion_request.dataValues['denies'] = denies
        promotion_request.dataValues['total'] = total
        promotion_request.dataValues['detail'] = details
        res.send(promotion_request)
        }
    );

    // post to create a promotion request
    router.post('/', async (req, res) =>{
        console.log("-----> Request body : ", req.body);
        await promoRequestModel.create({
            'user_id': req.body['user_id'],
            'credential_id': req.body['credential_id'],
            'active': true,
            'approved' : false,
            'created_by': req.body['created_by'],
        }).then((result) => {
            res.send({'isSuccess': true,
                    'msg':'Promotion Request successfully created'})
        }).catch((result) =>{
            res.send({'isSuccess': false,
                    'msg':'Promotion Request is not successfully created'})
        });
    });

    // put to update a promotion request
    router.put('/', async (req, res) =>{
        console.log("-----> Request body : ", req.body);

        if (req.body['approved']){
            whose_credential = await promoRequestModel.findOne({
                where: {id: req.body['promo_request_id']}}
            )

            await userCredentialModel.update({'active': true,
                                              'date_promoted': Date(Date.now())},
                {
                    where: {user_id: whose_credential.user_id,
                            credential_id: whose_credential.credential_id}
                })
        }

        await promoRequestModel.update(
            data = req.body,
            {
                where: {
                    id: req.body['promo_request_id']
                }
        }).then((result) => {
            res.send({'isSuccess': true,
                    'msg':'Promotion Request successfully updated'})
        }).catch((result) =>{
            res.send({'isSuccess': false,
                    'msg':'Promotion Request is not successfully updated'})
        });
    });

    async function isUserPermittedVote(user_id){
        perm_id = await permissionModel.findOne({
            where: {'name': 'vote'
            }
        }).then(r => r.id)

        is_in = await userPermissionModel.findOne({
                            where: {'permission_id': perm_id,
                                    'user_id': user_id
                        }}).then(r => (r === null) ? false: true)
        return is_in
    }

    // post to create a promotion request vote
    router.post('/vote/', async (req, res) =>{
        console.log("-----> Request body : ", req.body);

        const is_in = await isUserPermittedVote(req.body['user_id'])
        if (!is_in){
            res.send({'isSuccess': false,
                      'msg':'You have no right to vote'})}
        else{
            if ('comments' in req.body){
                comments = req.body['comments'];
            }
            else{
                comments = '';
            }
            await promoRequestVoteModel.create({
                    'user_id': req.body['user_id'],
                    'promo_request_id': req.body['promo_request_id'],
                    'vote': req.body['vote'],
                    'comments' : comments,
                    'created_by': req.body.created_by,
            }).then((result) => {
                res.send({'isSuccess': true,
                        'msg':'Promotion Request Vote successfully created'})
            }).catch((result) =>{
                res.send({'isSuccess': false,
                        'msg':'Promotion Request Vote is not successfully created'})
            });
        }
    });

    // put to update a promotion request vote
    router.put('/vote', async (req, res) =>{
        console.log("-----> Request body : ", req.body);
        const is_in = await isUserPermittedVote(req.body['user_id'])
        if (!is_in){
            res.send({'isSuccess': false,
                    'msg':'You have no right to update vote'})}
        else{
            await promoRequestVoteModel.update({
                'vote': req.body.vote,
                'comments' : req.body.comments,
                },
                {
                    where: {user_id: req.body['user_id'],
                            promo_request_id: req.body['promo_request_id']}
                }
            ).then((result) => {
                res.send({'isSuccess': true,
                        'msg':'Promotion Request Vote successfully updated'})
            }).catch((result) =>{
                res.send({'isSuccess': false,
                        'msg':'Promotion Request Vote is not successfully updated'})
            });
        }
    });

    return router;
};

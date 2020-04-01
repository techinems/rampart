const express = require('express');
const { QueryTypes } = require('sequelize');

module.exports = db => {
    const router = express.Router();

    const promoRequestModel = db.model('promo_requests');
    const promoRequestVoteModel = db.model('promo_request_votes');
    const credentialModel = db.model('credentials')

    // Get all promotions
    router.get('/', async (req, res) => res.json(await promoRequestModel.findAll()));

    //Get a Promotion request detail information
    router.get('/:promotionId', async(req, res) =>{

        const promotion_request = await promoRequestModel.findOne({where:
                                                    {id: req.params.promotionId}})

        const credential_name = await credentialModel.findOne({where:
                                                    {id: promotion_request.credential_id}}
                                                    ).then(r => r.name)

        const votes_results = await promoRequestVoteModel.findAll({where: {
                                                                promotion_id: req.params.promotionId
                                                                }})

        const votes = votes_results.map(cred.vote == true).reduce((a, b) => a + b, 0)
        const denies = votes_results.map(cred.vote == false).reduce((a, b) => a + b, 0)
        const total = votes_results.length;

        promotion_request['credentialName'] = credential_name
        promotion_request['votes'] = votes
        promotion_request['denies'] = denies
        promotion_request['total'] = total
        promotion_request['detail'] = votes_results
        res.send(promotion_request)
        }
    );

    // post to create a promotion request
    router.post('/', async (req, res) =>{
        console.log("-----> Request body : ", req.body);
        await promoRequestModel.create({
            'user_id': req.body.user_id,
            'credential_id': req.body.credential_id,
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
    router.put('/:promotionRequestId', async (req, res) =>{
        console.log("-----> Request body : ", req.body);
        await promoRequestModel.update(
            data = req.body,
            {where: {id: req.params.promotionRequestId}

        }).then((result) => {
            res.send({'isSuccess': true,
                    'msg':'Promotion Request successfully updated'})
        }).catch((result) =>{
            res.send({'isSuccess': false,
                    'msg':'Promotion Request is not successfully updated'})
        });
    });

    // post to create a promotion request vote
    router.post('/vote/', async (req, res) =>{
        console.log("-----> Request body : ", req.body);
        await promoRequestVoteModel.create({
            'user_id': req.body.user_id,
            'promotion_request_id': req.promotion_request_id,
            'comments' : 'None Comments',
            'created_by': req.body.created_by,
        }).then((result) => {
            res.send({'isSuccess': true,
                    'msg':'Promotion Request Vote successfully created'})
        }).catch((result) =>{
            res.send({'isSuccess': false,
                    'msg':'Promotion Request Vote is not successfully created'})
        });
    });

    // put to update a promotion request vote
    router.put('/vote/:promotionRequestId&:userId', async (req, res) =>{
        console.log("-----> Request body : ", req.body);
        await promoRequestVoteModel.update({
            'vote': req.body.vote,
            'comments' : req.body.comments,
            },
            {
                where: {user_id: req.params.userId,
                        promotion_request_id: req.params.promotionRequestId}
            }
        ).then((result) => {
            res.send({'isSuccess': true,
                    'msg':'Promotion Request Vote successfully created'})
        }).catch((result) =>{
            res.send({'isSuccess': false,
                    'msg':'Promotion Request Vote is not successfully created'})
        });
    });

    return router;
};

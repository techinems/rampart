const express = require('express');
const { QueryTypes } = require('sequelize');

module.exports = db => {
    const router = express.Router();

    const promoRequestModel = db.model('promo_requests');
    const promoRequestVoteModel = db.model('promo_request_votes');
    const credentialModel = db.model('credentials')

    // Get all promotions
    router.get('/', async (req, res) => res.json(
        await promoRequestModel.findAll({where:
                                            {active: true}
                                        })));

    //Get a Promotion request detail information
    router.get('/:promotionId', async(req, res) =>{

        const promotion_request = await promoRequestModel.findOne({where:
                                                    {id: req.params.promotionId}})

        const credential_name = await credentialModel.findOne({where:
                                                    {id: promotion_request.credential_id}}
                                                    ).then(r => r.name)

        const votes_results = await promoRequestVoteModel.findAll({
                where:{
                        promo_request_id: req.params.promotionId
                      }}).then(result => result.map(r => {
                                                    return {'comments': r.comments,
                                                            'vote': r.vote,
                                                            'user_id': r.user_id}
                                                    }))

        const votes = votes_results.map(r => (r.vote == true)? 1: 0).reduce(
            (a, b) => a + b, 0)
        // console.log(votes)
        const denies = votes_results.map(r => (r.vote == false)? 1: 0).reduce(
            (a, b) => a + b, 0)
        const total = votes_results.length;

        promotion_request.dataValues['credentialName'] = credential_name
        promotion_request.dataValues['votes'] = votes
        promotion_request.dataValues['denies'] = denies
        promotion_request.dataValues['total'] = total
        promotion_request.dataValues['detail'] = votes_results
        res.send(promotion_request)
        }
    );

    // post to create a promotion request
    router.post('/', async (req, res) =>{
        console.log("-----> Request body : ", req.body);
        await promoRequestModel.create({
            'user_id': req.body['user_id'],
            'credential_id': req.body['credential_id'],
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

    // post to create a promotion request vote
    router.post('/vote/', async (req, res) =>{
        console.log("-----> Request body : ", req.body);
        await promoRequestVoteModel.create({
                'user_id': req.body['user_id'],
                'promo_request_id': req.body['promo_request_id'],
                'comments' : 'Empty',
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
    router.put('/vote', async (req, res) =>{
        console.log("-----> Request body : ", req.body);
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
    });

    return router;
};

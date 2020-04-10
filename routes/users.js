const express = require('express');

module.exports = db => {
    const router = express.Router();
    const userModel = db.model('users');
    const userCredentialModel = db.model('users_credentials');

    router.get('/', async (req, res) => res.json(await userModel.findAll()));

    router.get('/:userId', async (req, res) => {
        await userModel.findOne({
                    where: {
                            id: req.params.userId
                        }
        }).then(r => res.send(r));
    });

    // User Login
    router.post('/sessions', async(req, res) =>{
        console.log("-----> Request body : ",req.body);
        email = req.body['email']
        password = req.body['password']

        targetUser = await userModel.findOne({
            where: {
              email: email,
              password : password
            }
        })
        if (!targetUser){
            res.send({'isSuccess': false,
                    'msg':'Invalid email or password'})
        } else {
            var date = new Date();
            var current_stamp = date.getTime();
            await userModel.update(
                {last_login: current_stamp},
                {
                    where: {id: targetUser.id}
                }
            )
            res.send({'isSuccess': true,
                      'msg': 'Successful login',
                      'result': targetUser})
        }
    });

    // post to create a user
    router.post('/', async (req, res) =>{
        console.log("-----> Request body : ", req.body);
        const result = await userModel.findOne({where: {email: req.body.email}});
        if (result){
            res.send({'isSuccess': false,
                    'msg':'user exist'})
            return ;
        }

        await userModel.create({
            'first_name': req.body['first_name'],
            'last_name': req.body['last_name'],
            'password' : req.body['password'],
            'phone' : req.body['phone'],
            'dob' : req.body['dob'],
            'email' : req.body['email'],
            'admin' : false,
            'active' : true,
            'access_revoked' : false,
            'created_by': 0,
            'updated_by': 0
        }).then(async user => {
            await userCredentialModel.create({
                'user_id': user.id,
                'credential_id': 0,
                'active' : true,
                'created_by': 0})})
        .then((result) => {
            res.send({'isSuccess': true,
                    'msg':'user successfully created'})
        }).catch((result) =>{
            res.send({'isSuccess': false,
                    'msg':'user is not successfully created'});
        });
    })

    // put to update a user
    router.put('/', async (req, res) =>{
        console.log("-----> Request body in update user: ", req.body);
        const data = req.body;
        await userModel.update(
            data,
            {where:
                {id: data.id}}
        ).then((result) => {
            res.send({'isSuccess': true,
                    'msg':'user successfully update'})
        }).catch((result) =>{
            res.send({'isSuccess': false,
                    'msg':'user is not successfully updated'})
        });
    })

    return router;
}

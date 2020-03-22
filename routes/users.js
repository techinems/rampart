const express = require('express');

module.exports = db => {
    const router = express.Router();
    const userModel = db.model('users');

    router.get('/', async (req, res) => res.json(await userModel.findAll()));

    router.post('/',(req, res) =>{
        console.log("-----> Request body : ",req.body);
        userModel.create({
            'first_name': req.body['first_name'],
            'last_name': req.body['last_name'],
            'password' : req.body['password'],
            'phone' : req.body['phone'],
            'dob' : Date(req.body['dob']),
            'email' : req.body['email'],
            'admin' : false,
            'active' : true,
            'access_revoked' : false,
            'created_by': 0,
            'updated_by': 0
        }).then((r) => {
            res.send({'msg':'user successfully created'})
        });

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
            res.send({'message':'Invalid email or password'})    
        } else {
            res.send(targetUser)
        }
        
    });

    router.get('/:userId', async (req, res) => {
        res.json(await db.model('users').findOne({ where: { id: req.params.userId }}));
    });

    
    // router.post

    

    // TODO: post to create a user
    // TODO: put to update a user
    // TODO: delete to delete a user

    return router;
};

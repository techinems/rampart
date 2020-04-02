const express = require('express');
const { QueryTypes } = require('sequelize');
const sequelize = require('sequelize');

module.exports = db => {
    const router = express.Router();
    const permissionModel = db.model('permissions');
    const userPermissionModel = db.model('users_permissions')
    // Get all permissions, if keyWord in it.
    router.get('/:keyWord', async (req, res) => {
        await permissionModel.findAll({
            where: {
                name: {
                    [sequelize.Op.iLike]: '%' + req.params.keyWord + '%',
                }
            }
        }).then(r => res.send(r))
    });


    // post to create a permission
    router.post('/', async (req, res) =>{
        console.log("-----> Request body : ", req.body);
        await permissionModel.create({
            'name': req.body['name'],
            'abbr': req.body['abbr'],
            'active': true,
            'description': req.body['description'],
            'created_by': req.body['created_by'],
        }).then((result) => {
            res.send({'isSuccess': true,
                    'msg':'permission successfully created'})
        }).catch((result) =>{
            res.send({'isSuccess': false,
                    'msg':'permission is not successfully created'})
        });
    });

    // put to update a permission
    router.put('/', async (req, res) =>{
        console.log("-----> Request body : ", req.body);
        await permissionModel.update(req.body,
            {
                where: {id: req.body['permission_id']}
            }
        ).then((result) => {
            res.send({'isSuccess': true,
                      'msg':'permission successfully updated'})
        }).catch((result) =>{
            res.send({'isSuccess': false,
                    'msg':'permission is not successfully updated'})
        });
    });

        // List all permission by users
    router.get('/user/:userId', async(req, res) =>{

        await db.query("\
                        SELECT name, permission_id, description, users_permissions.active \
                        FROM \
                            permissions \
                        JOIN \
                            users_permissions \
                        ON permissions.id = users_permissions.permission_id \
                        WHERE users_permissions.user_id = (:user_id)",
                        {
                            replacements: {user_id: req.params.userId},
                            type: QueryTypes.SELECT
                        }).then(result => {
                                res.send(result)
                            })
        });

    router.post('/user', async (req, res) =>{
        console.log("-----> Request body : ", req.body);
        await userPermissionModel.create({
            'user_id': req.body['user_id'],
            'permission_id': req.body['permission_id'],
            'active' : true,
            'created_by': req.body['created_by'],
        }).then((result) => {
            res.send({'isSuccess': true,
                    'msg':'User permission successfully created'})
        }).catch((result) =>{
            res.send({'isSuccess': false,
                    'msg':'User permission is not successfully created'})
        });
    });

    router.put('/user', async (req, res) =>{
        console.log("-----> Request body : ", req.body);
        await userPermissionModel.update(req.body,
            {
                where: {permission_id: req.body['permission_id'],
                        user_id: req.body['user_id']}
            }
        ).then((result) => {
            res.send({'isSuccess': true,
                      'msg':'User permission successfully updated'})
        }).catch((result) =>{
            res.send({'isSuccess': false,
                    'msg':'User permission is not successfully updated'})
        });
    });

    return router;
};

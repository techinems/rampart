const express = require('express');
const { QueryTypes } = require('sequelize');


module.exports = db => {
    const router = express.Router();

    const permissionModel = db.model('permissions');

    // Get all permissions, if keyWord in it.
    router.get('/', async (req, res) => {
        if ('keyWord' in req.body){
            await permissionModel.findAll({
                where: {
                    name: {
                        [sequelize.Op.iLike]: '%' + req.body.keyWord + '%'
                    }
                }
            }).then(r => res.send(r))
        }
        else{
            await permissionModel.findAll().then(r => res.send(r))
        }
    });

    // List all permission by users
    router.get('/:userId', async(req, res) =>{

        await sequelize.query("\
                                SELECT name, permission_id, description, active \
                                FROM \
                                    permissions \
                                JOIN \
                                    users_permissions \
                                ON permissions.id = users_permissions.crendential_id \
                                WHERE users_permissions.user_id = (:user_id)",
                                {
                                    replacements: {user_id: req.params.userId},
                                    type: QueryTypes.SELECT
                                }).then(result => {
                                        res.send(result)
                                    }).catch(res.send({'isSuccess': false}))
        });

    // post to create a permission
    router.post('/', async (req, res) =>{
        console.log("-----> Request body : ", req.body);
        await permissionModel.create({
            'name': req.body['name'],
            'abbr': req.body['abbr'],
            'description': req.body['description'],
            'created_by': req.body['created_by'],
            'updated_by': 0
        }).then((result) => {
            res.send({'isSuccess': true,
                    'msg':'permission successfully created'})
        }).catch((result) =>{
            res.send({'isSuccess': false,
                    'msg':'permission is not successfully created'})
        });
    });

    // put to update a permission
    router.put('/:permissionId', async (req, res) =>{
        console.log("-----> Request body : ", req.body);
        await permissionModel.update(req.body,
            {
                where: {id: req.params.permissionId}
            }
        ).then((result) => {
            res.send({'isSuccess': true,
                      'msg':'permission successfully updated'})
        }).catch((result) =>{
            res.send({'isSuccess': false,
                    'msg':'permission is not successfully updated'})
        });
    });

    return router;
};

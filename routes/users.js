const express = require('express');

module.exports = db => {
    const router = express.Router();

    router.get('/', async (req, res) => {
        res.json(await db.model('users').findAll());
    });

    return router;
};
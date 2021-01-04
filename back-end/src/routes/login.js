const router = require('express').Router();
const { client } = require('../dbconfig');
const { errorHandler } = require('../errorHandler');
const crypto = require('crypto');

router.route('/').post((req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const token = crypto.randomBytes(16).toString('hex');

    console.log(req.body);

    const query = {
        text: 'select * from login($1,$2,$3)',
        values: [username, password, token]
    }

    client.query(query, (err, reply) => {
        if (err) {
            errorHandler(err, res);
        } else {
            res.status(200).json({ 
                token: reply.rows[0]['token']
            });
        }
    });

});

module.exports = router;
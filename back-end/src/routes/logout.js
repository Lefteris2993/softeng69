const router = require('express').Router();
const { client } = require('../dbconfig');
const { errorHandler } = require('../errorHandler');

router.route('/').post((req, res) => {
    const token = req.headers['x-observatory-auth'];
    const query = {
        text: 'update users set token=null where token=($1)',
        values: [token]
    }

    client.query(query, (err, reply) => {
        if (err) {
            errorHandler(err, res);
        } else {
            res.status(200).send('OK');
        }
    });
});

module.exports = router;
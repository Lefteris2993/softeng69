const router = require('express').Router();
const { client } = require('../dbconfig');
const { errorHandler } = require('../errorHandler');

router.route('/:providerID/:from/:to').get((req, res) => {
    const token = req.headers['x-observatory-auth'];
    const providerID = req.params.providerID;
    const from = req.params.from;
    const to = req.params.to;

    var query;

    query = {
        text: 'select * from provreq($1,$2,$3,$4)',
        values: [providerID, from, to, token]
    }
    client.query(query, (err, reply) => {
        if (err) {
            errorHandler(err, res);
        } else {
            res.status(200).json(reply.rows[0]);
        }
    });
});

module.exports = router;
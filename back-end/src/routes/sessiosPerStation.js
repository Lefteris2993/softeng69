const router = require('express').Router();
const { client } = require('../dbconfig');
const { errorHandler } = require('../errorHandler');

router.route('/:stationID/:from/:to').get((req, res) => {
    const token = req.headers['x-observatory-auth'];
    const stationID = req.params.stationID;
    const from = req.params.from;
    const to = req.params.to;

    var result, query;

    query = {
        text: 'select * from stareq($1,$2,$3,$4)',
        values: [stationID, from, to, token]
    }
    client.query(query, (err, reply) => {
        if (err) {
            errorHandler(err, res);
        } else {
            result = reply.rows[0];
        }
    });

    query = {
        text: 'select * from sessiossummary($1, $2)',
        values: [stationID, token]
    }
    client.query(query, (err, reply) => {
        if (err) {
            errorHandler(err, res);
        } else {
            result.push({ChargingSessiosList: reply.rows});
            res.status(200).json(result);
        }
    })
});

module.exports = router;
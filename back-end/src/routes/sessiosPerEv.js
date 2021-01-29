const router = require('express').Router();
const { client } = require('../dbconfig');
const { errorHandler } = require('../errorHandler');

router.route('/:vehicleID/:from/:to').get((req, res) => {
    const token = req.headers['x-observatory-auth'];
    const vehicleID = req.params.vehicleID;
    const from = req.params.from;
    const to = req.params.to;

    var result, query;

    query = {
        text: 'select * from vehreq($1,$2,$3,$4)',
        values: [vehicleID, from, to, token]
    }
    client.query(query, (err, reply) => {
        if (err) {
            errorHandler(err, res);
        } else {
            result = reply.rows[0];
        }
    });

    query = {
        text: 'select * from vehiclechargingsessios($1, $2)',
        values: [vehicleID, token]
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
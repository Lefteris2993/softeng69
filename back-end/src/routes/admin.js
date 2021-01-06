const router = require('express').Router();
const { client } = require('../dbconfig');
const { errorHandler } = require('../errorHandler');
const { route } = require('./login.js');

router.route('/usermod/:username/:password').post((req, res) => {
    const token = req.headers['x-observatory-auth'];
    const username = req.params.username;
    const password = req.params.password;

    const query = {
        text: 'select * from usermod($1,$2,$3)',
        values: [username, password, token]
    }

    client.query(query, (err, reply) => {
        console.log(reply);
        if (err) {
            errorHandler(err, res);
        } else {
            res.status(200).send('OK');
        }
    })
});

router.route('/users/:username').get((req, res) => {
    const token = req.headers['x-observatory-auth'];
    const username = req.params.username;

    const query = {
        text: 'select * from get_user($1,$2)',
        values: [username, token]
    }

    client.query(query, (err, reply) => {
        console.log(reply);
        if (err) {
            errorHandler(err, res);
        } else {
            if (reply.rowCount < 1) {
                res.status(403).send('No Data');
            } else {
                res.status(200).json(reply.rows[0]);
            }
        }
    })
});

router.route('/system/sessionsupd').post((req, res) => {
    const token = req.headers['x-observatory-auth'];
    //??????????
});

router.route('/healthcheck').get((req, res) => {
    const token = req.headers['x-observatory-auth'];

    const query = {
        text: 'select * from healthcheck($1)',
        values: [token]
    }

    client.query(query, (err, reply) => {
        if (err) {
            res.status(418).json({ status: 'failed' }); 
        } else {
            res.status(200).json({ status: 'OK' });
        }
    });
});

router.route('/resetsessions').post((req, res) => {
    const token = req.headers['x-observatory-auth'];

    const query = {
        text: 'select * from resetsessions($1)',
        values: [token]
    }

    client.query(query, (err, reply) => {
        if (err) {
            res.status(418).json({ status: 'failed' }); 
        } else {
            res.status(200).json({ status: 'OK' });
        }
    })
});

module.exports = router;
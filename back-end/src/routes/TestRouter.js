const router = require('express').Router();
const { client } = require('../dbconfig');
const { errorHandler } = require('../errorHandler');

router.route('/').get((req, res) => {
    const query = {
        text: 'SELECT * FROM test_table'
    }
    
    client.query(query, (err, reply) => {
        if (err) errorHandler(err, res);
        else res.status(200).json({test: reply.rows[0]['id']});
    })
})

module.exports = router;
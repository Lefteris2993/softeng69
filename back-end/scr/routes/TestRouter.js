const router = require('express').Router();
const { client } = require('../dbconfig.js');

router.route('/').get((req, res) => {
    const query = {
        text: 'SELECT * FROM test_table'
    }
    
    client.query(query, (err, result) => {
        if (err) console.log(err);
        else res.status(200).json({test: 'ok!'});
    })
})

module.exports = router;
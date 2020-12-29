const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const https = require('https');

const options = {
    key: fs.readFileSync(__dirname + '/certificates/key.pem'),
    cert: fs.readFileSync(__dirname + '/certificates/cert.pem'),
    passphrase: 'team69'
};

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

const TestRouter = require('./routes/TestRouter');

app.use('/test', TestRouter);


var httpsServer = https.createServer(options, app);

httpsServer.listen(8765);


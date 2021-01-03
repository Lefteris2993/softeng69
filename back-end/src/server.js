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
const LoginRouter = require('./routes/login');
const LogoutRouter = require('./routes/logout');
const AdminRouter = require('./routes/admin');

app.use('/test', TestRouter);
app.use('/evcharge/api/login', LoginRouter);
app.use('/evcharge/api/logout', LogoutRouter);
app.use('/evcharge/api/admin', AdminRouter);


var httpsServer = https.createServer(options, app);

httpsServer.listen(8765);


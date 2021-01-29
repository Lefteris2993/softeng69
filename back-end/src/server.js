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

const LoginRouter = require('./routes/login');
const LogoutRouter = require('./routes/logout');
const AdminRouter = require('./routes/admin');
const Checkout = require('./routes/checkout');
const SessiosPerPoint = require('./routes/sessiosPerPoint');
const SessiosPerStation = require('./routes/sessiosPerStation');
const SessiosPerEv = require('./routes/sessiosPerEv');
const SessiosPerProvider = require('./routes/sessiosPerProvider');

app.use('/evcharge/api/login', LoginRouter);
app.use('/evcharge/api/logout', LogoutRouter);
app.use('/evcharge/api/admin', AdminRouter);
app.use('/evcharge/api/checkout', Checkout);
app.use('/evcharge/api/sessiosperpoint', SessiosPerPoint);
app.use('//evcharge/api/sessiosperstation', SessiosPerStation);
app.use('/evcharge/api/sessiosperev', SessiosPerEv);
app.use('/evcharge/api/sessiosperprovider', SessiosPerProvider);


var httpsServer = https.createServer(options, app);

httpsServer.listen(8765);


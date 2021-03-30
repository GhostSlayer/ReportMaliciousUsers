const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const requestIp = require('request-ip');
const fetch = require('node-fetch');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', async (req, res) => {
    const clientIp = requestIp.getClientIp(req);

    await fetch(`https://api.abuseipdb.com/api/v2/report?ip=${clientIp}&comment=Port scan attempt to 443&categories=14`, {
        method: 'post',
        headers: { 'Key': process.env.ABUSEIPDB_API_KEY }
    })

    res.sendStatus(404)
});

app.use('/ping0Test1To3Check9If6The3Website13Works134645', (req, res) => {
    res.sendStatus(200)
})

module.exports = app;

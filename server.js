require('dotenv').config()
const express = require('express');
const fetch = require('node-fetch');
const blacklist = require('express-blacklist');

let ports = [443, 80, 8080];

const app = express();
app.use(blacklist.blockRequests('blacklist.txt'));


app.use('/', async (req, res) => {
    let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    let letter = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 1).toUpperCase()
    let port;

    if (ip.substr(0, 7) === "::ffff:") {
        ip = ip.substr(7)
    }

    if (ip === process.env.IP) {
        res.redirect('http://192.168.1.1')
        return;
    }

    blacklist.addAddress('::ffff:' + ip)

    if (req.headers.host.includes('443')) port = 443
    if (req.headers.host.includes('8080')) port = 8080

    await fetch(`https://api.abuseipdb.com/api/v2/report?ip=${ip}&comment=Unauthorized connection attempt detected from IP address ${ip} to port ${port ? port : '80'} [${letter}]&categories=14`, {
        method: 'post',
        headers: { 'Key': process.env.ABUSEIPDB_API_KEY }
    })

    return res.sendStatus(404)
})

ports.forEach(function(port) {
    app.listen(port);
});

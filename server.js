require('dotenv').config()
const express = require('express');
const fetch = require('node-fetch');

let ports = [443, 80];

const app = express();

app.use('/', async (req, res) => {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log(ip); // ip address of the user

    if (ip === '91.156.42.96') {
        res.redirect('http://192.168.1.1')
        return;
    }

    await fetch(`https://api.abuseipdb.com/api/v2/report?ip=${ip}&comment=Trying to access port 80 or 443&categories=14`, {
        method: 'post',
        headers: { 'Key': process.env.ABUSEIPDB_API_KEY }
    })

    res.sendStatus(404)
})


ports.forEach(function(port) {
    app.listen(port);
});

require('dotenv').config()
const express = require('express');
const fetch = require('node-fetch');

let ports = [443, 80];

const app = express();

app.use('/', async (req, res) => {
    let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    ip = ip.split(':').pop();
    console.log(ip); // ip address of the user

    if (ip === '91.156.42.96') {
        res.redirect('http://192.168.1.1')
        return;
    }

    if (req.headers.host.includes('443')) {
        console.log('Attempt to connect to port 443')
        await fetch(`https://api.abuseipdb.com/api/v2/report?ip=${ip}&comment=Trying to access port 443&categories=14`, {
            method: 'post',
            headers: { 'Key': process.env.ABUSEIPDB_API_KEY }
        })

        return res.sendStatus(404)
    }

    console.log('Attempt to connect to port 80')
    await fetch(`https://api.abuseipdb.com/api/v2/report?ip=${ip}&comment=Trying to access port 80&categories=14`, {
        method: 'post',
        headers: { 'Key': process.env.ABUSEIPDB_API_KEY }
    })

    return sendStatus(404)
})

app.use('/ue1r0t2p1ng', (req, res) => {
    return res.sendStatus(200)
})


ports.forEach(function(port) {
    app.listen(port);
});

const express = require('express');
import('node-fetch');
const serverless = require('serverless-http');

const app = express();
const router = express.Router();

// Middleware to set headers
router.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'text/plain; charset=UTF-8');
    res.setHeader('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    next();
});

router.get('/cnb/daily', async (req, res) => {
    try {
        const cnbApiUrl = 'https://www.cnb.cz/en/financial-markets/foreign-exchange-market/central-bank-exchange-rate-fixing/central-bank-exchange-rate-fixing/daily.txt';
        const response = await fetch(cnbApiUrl);
        const data = await response.text();

        console.log(response.status);

        res.send(data);
    } catch (error) {
        // Handle errors
        console.error(error);
        res.status(500).send('Error proxying CNB API');
    }
});

app.use('/', router);  // path must route to lambda

module.exports.handler = serverless(app);

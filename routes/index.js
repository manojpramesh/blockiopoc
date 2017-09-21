const express = require('express');
const router = express.Router();
const bitcoin = require('bitcoin');

const client = new bitcoin.Client({
    host: '52.163.211.219',
    port: 19001,
    user: 'admin1',
    pass: '123'
});


router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});


router.get('/difficulty', function(req, res, next) {
    client.getDifficulty(function(err, difficulty) {
        if (err) return console.error(err);
        res.json(difficulty);
    });
});


router.get('/getInfo', function(req, res, next) {
    client.getInfo(function(err, info, resHeaders) {
        if (err) return console.log(err);
        res.json(info);
    });
});


router.post('/sendTransaction', function(req, res, next) {
    client.sendToAddress(req.body.address, parseInt(req.body.amount), function(err, result) {
        if (err) return console.error(err);
        client.generate(1, function(err, res) {
            if (err) return console.error(err);
        });
        res.send(result);
    });
});


module.exports = router;
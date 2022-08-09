var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const NHApi = require('./nicehashapi');
require('dotenv').config({ path: '../.env' })


var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/getData', async (req, res) => {

  const isTest = req.query.test || false;
  
  let host = isTest ? "https://api-test.nicehash.com" : "https://api2.nicehash.com"

  const config = {
    apiHost: host,
    apiKey: process.env.APIKEY,
    apiSecret: process.env.APISECRET,
    orgId: process.env.ORGID
  }
  const api = new NHApi(config);
  
  const rigData = await api.MinerPrivate.getRigs().then((res) => {
    return res;
  });
  const walletBalance = await api.Accounting.getBalance("BTC").then((res) => {
    return res;
  });
  const btcPrice = await api.Accounting.getBTCPrice().then((res) => {
    return res;
  });
  return res.json({walletBalance, rigData, btcPrice});
})

app.get("/*",function(req,res,next){
  res.sendFile(__dirname + '/index.html');
})


module.exports = app;

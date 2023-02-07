var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const NHApi = require('./nicehashapi');

require('dotenv').config({ path: '../.env' })
const config = {
  apiKey: process.env.APIKEY,
  apiSecret: process.env.APISECRET,
  orgId: process.env.ORGID
}
const api = new NHApi(config);

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/getData', async (req, res) => {  
  const rigData = await api.MinerPrivate.getRigs().then((res) => {
    return res;
  });
  const walletBalance = await api.Accounting.getBalance("BTC").then((res) => {
    return res;
  });
  const prices = await api.Accounting.getBTCETHPrice().then((res) => {
    return res;
  });
  return res.json({walletBalance, rigData, btcPrice: prices[0], ethPrice: prices[1]});
})

app.get('/getWalletTransactions', async (req, res) => {  
  const timestamp = req.query?.timestamp || undefined
  const transactions = await api.Accounting.getActivities("BTC", undefined, timestamp).then((res) => {
    return res;
  });
  return res.json({transactions});
})

app.post('/loginUser', async (req, res) => {  
  const envEmail = process.env.EMAIL
  const envPassword = process.env.PASSWORD
  const requestEmail = req.body.email
  const requestPassword = req.body.password
  return res.json({
    loggedIn: requestEmail === envEmail && requestPassword === envPassword
  });
})


app.get("/*",function(req,res,next){
  res.sendFile(__dirname + '/index.html');
})


module.exports = app;

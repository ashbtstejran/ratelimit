const express=require('express');
const route=express.Router();   
const rateController=require('../controller/ratelimit.Controller');
const userController=require('../controller/logRegApi.Controller');
//const ratelimit=require('../middleware/ratelimit');
const authJwt = require('../middleware/authJwt');
const ratelimitt=require('../middleware/ratelimit');
const accountController=require('../controller/accounController');
const paymentController=require('../controller/payment.Controller');
//const {ratelimiter}= require("../middleware/ratelimit");
route.post('/add',authJwt.authJwt,ratelimitt,rateController.rate);
route.post('/register',userController.register);
route.post('/login',userController.login);
route.post('/post-payment/:id',paymentController.payment);
route.get('/',accountController.account);
module.exports=route;
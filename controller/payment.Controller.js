const express = require('express');
const stripe=require('stripe')("sk_test_51LmwqSSBm9aAezH17TcFADOUwJw7lzSyMTNRDRUtdrFBvYwWhSpoBuYFXkx0YIW7CuDG8VcT6LwmsSPBxWoErH6C00HDijeCSt");


const rateModel = require('../model/rateModel');
const userModel = require('../model/userModel');
const path = require('path');
const mongoose=require('mongoose');

class paymentController{
  

   async payment(req,res){
    // console.log(req.body);
    // console.log(req.user);
    let stripeprice = await rateModel.findOne({
        _id:req.params.id
       
    });
    console.log(stripeprice);
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
            {
                
               price:stripeprice.stripePriceId,
               
                quantity: 1,
            },
        ],
        mode: "subscription",

        discounts: [{
            coupon:stripeprice.stripeCuponId
          }],
        subscription_data:{
            trial_period_days:30,
            //coupon:stripeprice.stripeCuponId,
        },
        success_url: 'http://localhost:2021/success.html',
        cancel_url: 'http://localhost:2021/cancel.html',
    });

    res.json({  session});
   }

   
}
module.exports = new paymentController();





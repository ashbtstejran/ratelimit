const express = require('express');
const rateModel = require('../model/rateModel');
const stripe = require('stripe')("sk_test_51LmwqSSBm9aAezH17TcFADOUwJw7lzSyMTNRDRUtdrFBvYwWhSpoBuYFXkx0YIW7CuDG8VcT6LwmsSPBxWoErH6C00HDijeCSt");

class ratelimitController {
    async rate(req, res) {

        try {
            console.log(req.body);
            console.log(req.user);
            const rate = new rateModel({
                name: req.body.name,
                price: req.body.price,
                user: req.user.id
            });

            const result = await rate.save();
            const stripeproduct = await stripe.products.create({
                name: req.body.name,
            });

            const stripecoupon = await stripe.coupons.create({
                amount_off: 500,
                currency: 'usd',
                duration: 'repeating',
                duration_in_months: 3,
              });

            const stripeprice = await stripe.prices.create({
                unit_amount: result.price.split('$').pop(),
                currency: 'usd',
                recurring: { interval: 'year' },
                product: stripeproduct.id,
            });

            result.stripePriceId = stripeprice.id;
            result.stripeCuponId=stripecoupon.id;
            await result.save();
            res.status(201).json({
                status: "sucess",
                result: result,
                stripeproduct: stripeproduct,
                stripeprice: stripeprice,
                stripecoupon:stripecoupon,
                message: "Added Successfully"
            });

        }
        catch (err) {
            throw err;
        }

    }
}
module.exports = new ratelimitController();
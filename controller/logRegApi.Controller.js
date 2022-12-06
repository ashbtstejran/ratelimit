const LogReg = require('../model/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const session=require('express-session');
const memorystore=require('memorystore')(session);
//const Stripe=require('stripe')("sk_test_51LmwqSSBm9aAezH17TcFADOUwJw7lzSyMTNRDRUtdrFBvYwWhSpoBuYFXkx0YIW7CuDG8VcT6LwmsSPBxWoErH6C00HDijeCSt");
const stripe=require('./stripe');
class LogRegController {

    /**
      * 
      * @Method userAuth
      * @Description User Authentication
    */

    // async userAuth(req, res, next) {
    //     try {
    //         if(req.user) {
    //             // console.log("hiiiiiiiiiiiiiiiiiiii", req.user);
    //             next();
    //         }else {
    //             // console.log(req.user);
    //             return res.status(400).json({
    //                 message: 'Not A Valid User!'
    //             })
    //         }
    //     }catch(err) {
    //         throw err;
    //     }
    // }

    /**
     * @Method showMessage
     * @Description To Show A Welcome Message
    */

 

    /**
     * @Method register
     * @Description To Register A User
    */

    async register(req, res) {
        try {
            req.body.name = req.body.name;
            req.body.email = req.body.email;
            req.body.password = req.body.password;
            req.body.status=req.body.status;
          
            if(!(req.body.name && req.body.email && req.body.password)) {
                return res.status(400).json({
                    message: 'Field Should Not Be Empty!'
                })
            }else {
                let isEmailExists = await LogReg.findOne({
                    email: req.body.email
                });
                if(!isEmailExists) {
                    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
                    let saveData =  await LogReg.create(req.body);


                    if(saveData && saveData._id) {
                        //create token
                        // let token = jwt.sign({
                        //     _id: saveData._id,
                        //     email: saveData.email
                        // }, 'M3S3CR3TKY4', {
                        //     expiresIn: '5m'
                        // })
                        saveData = saveData.toObject()

                        //saveData.token= token;

                       
                            // const customer = await Stripe.customers.create({
                            //   email:req.body.email,
                            //   description: 'New Customer'
                            // })
                          
                            //return customer
                          

                        //   const getCustomerByID = async (id) => {
                        //     const customer = await Stripe.customers.retrieve(id)
                        //     return customer
                        //   }

                        return res.status(200).json({
                            message: 'Registration Successfully Done!!!',
                            data: saveData,
                            //customer:customer
                        })
                    }else {
                        return res.status(400).json({
                            message: 'Registration Not Successfully Done!!!',
                            data: saveData,
                           
                        })
                    }
                }else {
                    return res.status(400).json({
                        message: 'Email Is Already Exists!'
                    })
                }
            }
        }catch(err) {
            throw err;
        }
    }

    /**
     * @Method login
     * @Description Login
    */

    async login(req, res) {
        try {
            req.body.email = req.body.email;
            req.body.password = req.body.password;
            const customerr = await stripe.addNewCustomer(req.body.email)
            req.session.customerID=customerr,
            req.session.email=req.body.email
            if(!(req.body.email && req.body.password)) {
                return res.status(400).json({
                    message: 'Field Should Not Be Empty!'
                })
            }else {
                let isUserExists = await LogReg.findOne({
                    email: req.body.email,
                    //role:role
                })
                if(isUserExists) {
                    
                    let hashPassword = isUserExists.password;
                    if(bcrypt.compareSync(req.body.password, hashPassword)) {
                        const token = jwt.sign({
                            id: isUserExists._id,
                            email: isUserExists.email,
                            name: isUserExists.name
                        }, 'M3S3CR3TKY4', {expiresIn: '5h'});
                        isUserExists = isUserExists.toObject();
                        isUserExists.token = token;
                        return res.status(200).json({
                            message: 'Logged In Successfully!',
                            data: isUserExists,
                            customerr:customerr
                        })
                    }else {
                        return res.status(400).json({
                            message: 'Password Not Matched!'
                        })
                    }
                }else {
                    return res.status(400).json({
                        message: 'User Not Exists!'
                    })
                }
            }
        }catch(err) {
            throw err;
        }
    }

    /**
     * @Method dashboard
     * @Description To Enter In Dahboard - The Secure Page
    */

   

    /**
     * @Method welcome
     * @Description To Show A Secure Welcome Message
    */
   
}

module.exports = new LogRegController();
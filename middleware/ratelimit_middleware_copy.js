
const rateLimit=require('express-rate-limit');
const userModel=require('../model/userModel');
class rate{
async ratelimitt(req,res,next){
	try{
		let userstatus= await userModel.find({
			status:"PREMIUM"
		})
		if(!userstatus){
			const ratelimiter=rateLimit({
				windowMs: 2* 60 * 1000, // 2 minutes
				max: 5, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
				standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
				legacyHeaders: false, // Disable the `X-RateLimit-*` headers
			})
		}
		else{
			const premiumratelimiter=rateLimit({
				windowMs: 2* 60 * 1000, // 2 minutes
				max: 8, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
				standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
				legacyHeaders: false, // Disable the `X-RateLimit-*` headers
			})
			return next();
		}
	}
	catch(err){
		throw err;
	}

	
}
}
	


  

module.exports = new rate();
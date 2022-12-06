const rateLimit=require('express-rate-limit');
const userModel=require('../model/userModel');

		const isPremium = async (user) => {
			console.log('AAAA', user);
			if(user || user.status=="PREMIUM") {
				return 10;
			} else {
				return 3;
			}
		}
		
		const limiter = rateLimit({
			// ...
			windowMs: 2* 60 * 1000, // 2 minutes
			max: async (request, response) => {
				return await isPremium(request.user)
			},
			message: async (request, response) => {
				if (await isPremium(request.user))
					return 'You can only make 10 requests every hour.'
				else return 'You can only make 3 requests every hour.'
			},
			standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
				legacyHeaders: false, 
		})

module.exports = limiter;
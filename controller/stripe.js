const stripe=require('stripe');
const STRIPE_SECRET_KEY="sk_test_51LmwqSSBm9aAezH17TcFADOUwJw7lzSyMTNRDRUtdrFBvYwWhSpoBuYFXkx0YIW7CuDG8VcT6LwmsSPBxWoErH6C00HDijeCSt";
const Stripe=stripe(STRIPE_SECRET_KEY,{
    apiVersion:'2022-11-15'
})
const addNewCustomer=async(email)=>{
    const customer=await Stripe.customers.create({
        email,
        description:'New customer'
    })
    
    return customer;
}

module.exports={
    addNewCustomer
}

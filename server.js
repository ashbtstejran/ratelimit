const express=require('express');
const mongoose=require('mongoose');
const ejs=require('ejs');
const bodyParser = require('body-parser');
const path=require('path');
const session=require('express-session');
const memorystore=require('memorystore');
const app=express();
const dbDriver="mongodb+srv://ashmita:u6UjiNwgp94R9jSY@cluster0.yvs85.mongodb.net/ratelimit";

app.use(express.json({ limit: '5mb' }));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
//app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));

app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Headers','Content-Type,Authorization');
    next()
})

app.use(session({
    saveUninitialized:false,
    cookie:{maxAge:86400000},
   
    resave:false,
    secret:'ashmit60'
}))
const RateRouter = require('./route/route');
app.use(RateRouter);

const port = process.env.PORT || 1998;
mongoose.connect(dbDriver, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => {
        app.listen(port, () => {
            console.log("Database Connected Successfully");
            console.log(`db connected at port ${port}`);
        })
    }).catch((err) => {
        console.log(err, "db connection failed");
    })
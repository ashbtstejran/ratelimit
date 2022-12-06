const express = require('express');

const path = require('path');
const mongoose=require('mongoose');

class accountController{
    async account (req, res){
      
        
           
            res.render("account", {
                title: "Account Page",
               
            })

       
       
    }
}
module.exports = new accountController();





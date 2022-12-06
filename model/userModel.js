const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    status:{
        type:String,
        required:true
    },
    // customer:{
    //    type:Schema.Types.ObjectId,
    //    required:true 
    // }
   

}, {
    timestamps: true,
    versionKey: false
})

module.exports = new mongoose.model('user', userSchema);
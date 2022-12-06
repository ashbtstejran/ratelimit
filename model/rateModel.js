const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ratelimitSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    price: {
        type: String,
        required: true
    },

    stripePriceId: {
        type: String,
        required: false
    },
    stripeCuponId:{
        type:String,
        required:false
    },
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    }


})

const ratelimitModel = new mongoose.model('rate', ratelimitSchema);
module.exports = ratelimitModel;
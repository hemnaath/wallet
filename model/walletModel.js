const mongoose = require('mongoose');


const walletSchema = new mongoose.Schema({
    balance:{type:Number, default:0},
    currency:{type:String, required:true},
},
{
    timestamps:true
});
const wallet = mongoose.model('wallet', walletSchema);


module.exports = wallet;
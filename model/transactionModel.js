const mongoose = require('mongoose');


const transactionSchema = new mongoose.Schema({
    mode:{type:String, default:null},
    amount:{type:Number, required:true},
    sender_wallet_id:{type:mongoose.Schema.Types.ObjectId, ref:'wallet'},
    reciever_wallet_id:{type:mongoose.Schema.Types.ObjectId, ref:'wallet'},
},
{
    timestamps:true
});
const transaction = mongoose.model('transaction', transactionSchema);


module.exports = transaction;
const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    name:{type:String, default:null},
    email:{type:String, default:null},
    password:{type:String, default:null},
    wallet_id:{type:mongoose.Schema.Types.ObjectId, ref:'wallet'},
},
{
    timestamps:true
});
const user = mongoose.model('user', userSchema);


module.exports = user;
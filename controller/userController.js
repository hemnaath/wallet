const User = require('../model/userModel');
const Wallet = require('../model/walletModel');
const passwordHelper = require('../helper/passwordHelper');
const { validationResult } = require('express-validator');


exports.register = async(req, res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) return LOG.info("Validation failed", { errors: errors.array()[0].msg }, res, false, 200);
    const {name, email, password, currency} = req.body;
    try{
        const userExists = await User.findOne({email});
        if(userExists) return LOG.info('User exists', null, res, false, 200);
        const encryptedPassword = await passwordHelper.passcrypt(password, 10);
        const walletData = await Wallet.create({currency});
        await User.create({name, email, password: encryptedPassword, wallet_id: walletData._id});
        LOG.info('User created successfully', null, res, true, 200);
    }catch(error){
        return res.status(500).json({message:error.message});
    }
}
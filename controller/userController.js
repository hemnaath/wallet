const User = require('../model/userModel');
const Wallet = require('../model/walletModel');
const passwordHelper = require('../helper/passwordHelper');
const { validationResult } = require('express-validator');
const tokenHelper = require('../helper/tokenHelper');
const wallet = require('../model/walletModel');


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
        LOG.error('Internal server error', null, error, res, false, 500);
    }
}

exports.login = async(req, res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) return LOG.info("Validation failed", { errors: errors.array()[0].msg }, res, false, 200);
    const {email, password} = req.body;
    try{
        const userData = await User.findOne({email});
        if(!userData) return LOG.info('User not found', null, res, false, 200);
        const isPasswordValid = await passwordHelper.compass(password, userData.password);
        if(!isPasswordValid) return LOG.info('Invalid password', null, res, false, 200);
        const token = tokenHelper.generateToken({ id: userData._id, email: userData.email, wallet_id: userData.wallet_id });
        LOG.info('Login successful', {token}, res, true, 200);
    }catch(error){
        LOG.error('Internal server error', null, error, res, false, 500);
    }
}
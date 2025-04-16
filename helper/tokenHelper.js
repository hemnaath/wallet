const jwt = require('jsonwebtoken');
require ('dotenv').config();


exports.generateToken = (payload) =>{
    const token = jwt.sign({ payload, expiresIn: '30m' }, process.env.SECRET_KEY);
    return token;
}
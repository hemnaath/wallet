const express = require('express');
require('./config/databaseConfig');
require('dotenv').config();
require('./utils/logger');
const { userRateLimiter } = require('./middleware/rateLimiter');
const userRoute = require('./route/userRoute');
const walletRoute = require('./route/walletRoute');
const transactionRoute = require('./route/transactionRoute');

const app = express();
app.use(userRateLimiter);
app.use(express.json());

app.use('/api', userRoute);
app.use('/api', walletRoute);
app.use('/api', transactionRoute);


app.listen(1731, ()=>{
    console.log("Server Connected");
});
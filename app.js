const express = require('express');
require('./config/databaseConfig');
require('dotenv').config();
require('./utils/logger');
const userRoute = require('./route/userRoute');
const walletRoute = require('./route/walletRoute');

const app = express();
app.use(express.json());

app.use('/api', userRoute);
app.use('/api', walletRoute);


app.listen(1731, ()=>{
    console.log("Server Connected");
});
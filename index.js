const express = require('express');
const mongoose = require('mongoose');
const apiRouter = require('./src/routes/index');
const User = require('./src/models/user');
const { connect } = require('./src/config/database');
require('dotenv').config();


const app = express();
app.use('/api',apiRouter);


const port = process.env.PORT || 3000
app.listen(port, async ()=>{
    console.log("Server is listening at port",port)
    await connect();
    console.log("Mongo db connected successfully.");
    console.log("Server started successfully.");
    // const user = await User.create({
    //     email:"nayaklitun9@gmail.com",
    //     password:"litunawref",
    //     username:"Litun"
    // })
    // console.log(user);
})
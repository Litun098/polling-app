const express = require('express');
const mongoose = require('mongoose');
const apiRouter = require('./src/routes/index');
const User = require('./src/models/user');
const { connect } = require('./src/config/database');
const bodyParser = require('body-parser');
const passport = require('passport')
require('./src/utils/auth')
require('dotenv').config();
const authRouter = require('./src/routes/authRoutes')
const app = express();

app.use('/api',passport.authenticate('jwt',{session:false}),apiRouter);
app.use('/',authRouter);
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

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
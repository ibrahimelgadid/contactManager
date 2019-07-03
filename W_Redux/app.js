/* ========================================= */
/* =/=/=/=/=/=>    Import consts  <=/=/=/=/= */
/* ========================================= */

const express = require('express');
const app = express();
// const port = require('./config/exports').PORT;
const port = process.env.port || 8000;
const path = require('path');
const cors = require('cors');
const bodyParser =  require('body-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const monHost = require('./config/exports').MongoHost;


const contacts = require('./router/contacts');


/* ========================================= */
/* =/=/=/=/=/=>    mongoose       <=/=/=/=/= */
/* ========================================= */
mongoose.connect(monHost);
mongoose.connection.once('connected',(err,connected)=>{
    if(err) throw err;
    console.log(`mongoose is connected`);
});




/* ========================================= */
/* =/=/=/=/=/=>    middleware     <=/=/=/=/= */
/* ========================================= */
app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))




/* ========================================= */
/* =/=/=/=/=/=> router controller <=/=/=/=/= */
/* ========================================= */
app.get('/',(req,res)=>{
    res.json('hello')
})


app.use('/contacts', contacts);

/* ========================================= */
/* =/=/=/=/=/=>    port listen    <=/=/=/=/= */
/* ========================================= */
app.listen(port, (err,done)=>{
    if(err){
        console.log(err);
        return;
    }
    console.log('you are on ' + port)
})
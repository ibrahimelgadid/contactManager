const mongoose = require('mongoose');

let contactSchema = mongoose.Schema({

    name:  {type:String,required:true},
    
    email: {type:String,required:true},

    phone: {type:String,default:'01024876339'},

    publishDate: {type:Date,default:Date.now},


});

module.exports = mongoose.model('contact', contactSchema);
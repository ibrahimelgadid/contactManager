/* ========================================= */
/* =/=/=/=/=/=>    Import consts  <=/=/=/=/= */
/* ========================================= */

const express = require('express');
const router = express.Router();
const Contact= require('../model/contact');
const flash = require('connect-flash');


/* ========================================= */
/* =/=/=/=/=/=>    get contacts      <=/=/=/=/= */
/* ========================================= */
router.get('/', (req,res)=>{
   Contact.find({}, (err,contacts)=>{
    if(err){
        console.log(err);
    }
    if(!contacts){
        res.json({contacts:'no data'})
    }
    res.json(contacts)
   });
})


/* ========================================= */
/* =/=/=/=/=/=>  get single contact  <=/=/=/=/= */
/* ========================================= */
router.get('/:contactID',(req,res)=>{
    Contact.findById(req.params.contactID,(err,contact)=>{
        if(err){console.log(err)};
        res.json(contact)
    });
 
 });



/* ========================================= */
/* =/=/=/=/=/=>    add new contact   <=/=/=/=/= */
/* ========================================= */
router.post('/', (req,res)=>{
    let newContact = new Contact({
        name:req.body.name,
        email:req.body.email,
        phone:req.body.phone

    });

    newContact.save((err,contacts)=>{
        if(err) {console.log(err)};
        res.json(contacts)
    });
});

/* ========================================= */
/* =/=/=/=/=/=>  edit exist contact  <=/=/=/=/= */
/* ========================================= */
router.put('/:contactID', (req,res)=>{
   Contact.findByIdAndUpdate(req.params.contactID,{
        name:req.body.name,
        email:req.body.email,
        phone:req.body.phone

   }, (err, contact)=>{
       if(err){console.log(err)};
        res.json(contact);
   })
})


/* ========================================= */
/* =/=/=/=/=>  delete exist contact  <=/=/=/=/= */
/* ========================================= */

router.delete('/:contactID', (req,res)=>{
    Contact.findByIdAndRemove(req.params.contactID, (err, done)=>{
        if(err){console.log(err)}
            res.json('deleted successfully')
    })
 });


module.exports = router;
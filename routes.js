'use strict';

const express = require('express');
const User = require('./models').User;
const { Course } = require('./models/')


// Construct a router instance.
const router = express.Router();
// Route that returns a list of users.
router.get('/users',async (req,res)=>{
    const user = await User.findAll();
       console.log(user)
    try{
       
    }catch{
        console.log('fail')
    }
 })

module.exports = router;
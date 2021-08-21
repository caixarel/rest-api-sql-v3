'use strict';

const express = require('express');
const User = require('./models').User;
const { Course } = require('./models/');
const { authenticateUser } = require('./middleware/user-authentication');


// Construct a router instance.
const router = express.Router();
// Route that returns data about the authenticated user
router.get('/users',authenticateUser ,async (req,res)=>{
    const currentUser =req.currentUser;
    try{
        //finds the current user on database 
        const user = await User.findByPk(currentUser.id,{attributes:["firstName","lastName","emailAddress"]});
        res.json({
            firstName:user.firstName,
            lastName:user.lastName,
            emailAddress:user.emailAddress
        }).status(200).end();
    }catch{
        res.status(400).end();

    }
 })
//Creates a new user
router.post('/users',async (req,res)=>{
    try{
        await User.create(req.body);
        res.location('/').status(201).end();
    //verifies if there are vmodel validation errors
    } catch(err){
        if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
            const errors = err.errors.map(error => error.message);
            res.status(400).json({ errors });   
          } else {
            res.status(500).json({ errors });   
            
          }
        }
    }
 )
//gets all the courses from the database
router.get('/courses',async (req,res)=>{
     try{
        const courses = await Course.findAll({
            include:[{
                model:User,attributes:["firstName","lastName","emailAddress"]
            }],attributes:["title","description","estimatedTime","materialsNeeded"]
        });
        res.status(200).json(courses);
     }catch(err){
        res.status(400).json({ message:"No courses found" });   
    }
})

//creates a new course
router.post('/courses',authenticateUser, async (req,res)=>{
    try{
        await Course.create(req.body);
        const courseId=await Course.findOne({order:[["createdAt","DESC"]]});
        res.location(`/courses/${courseId.id}`).status(201).end();
    }catch(err){
        if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
            const errors = err.errors.map(error => error.message);
            res.status(400).json({ errors });   
          } else {
            res.status(500).end();   
          }
        }
})
//Updates an existing course that belongs to the current user
router.put('/courses/:id',authenticateUser, async (req,res)=>{
    const user = req.currentUser;
        try{
        const course= await Course.findByPk(req.params.id);
    //if course belongs to current user
        if(user.id==course.userId && course){
            await course.update(req.body);
            res.location(`courses/${req.params.id}`).status(204).end();
        }else{
            res.status(403).json({ message:"acess denied" });   
        } 
    }catch(err){
        if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
            const errors = err.errors.map(error => error.message);
            res.status(400).json({ errors });   
          } else {
            res.status(500).end();
          }
        }
    })
 
//deletes a course that belongs to the current user
router.delete('/courses/:id',authenticateUser, async (req,res)=>
{
    const user = req.currentUser;
        try{
        const course= await Course.findByPk(req.params.id);
        //if course belongs to current user
        if(user.id==course.userId && course){
            await course.destroy();
            res.location(`courses`).status(204).end();
        }
        else{
        res.status(403).json({ message:"acess denied" });   
        }
    }catch(err){
        res.status(500).end();
    }    
})
//Find a specific course using a id number
 router.get('/courses/:id',async (req,res)=>{
    try{
       const course = await Course.findByPk(req.params.id,{
           include:[{
               model:User,model:User,attributes:["firstName","lastName","emailAddress"]
            }],attributes:["title","description","estimatedTime","materialsNeeded"]
       });
       if(course){
            res.status(200).json(course);
       }else{
        res.status(404).json({message:"Course doesn't exist"});
       }
    }catch(err){
        res.status(401).end();
    }
})

module.exports = router;
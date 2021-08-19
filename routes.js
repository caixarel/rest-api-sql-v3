'use strict';

const express = require('express');
const User = require('./models').User;
const { Course } = require('./models/')


// Construct a router instance.
const router = express.Router();
// Route that returns a list of users.
router.get('/users',async (req,res)=>{
    try{
        const user = await User.findByPk(1);
        res.json({
            firstName:user.firstName,
            lastName:user.lastName,
            emailAddress:user.emailAddress
        })
        res.status(200);
    }catch{
        res.status(400);

    }
 })

 router.post('/users',async (req,res)=>{
    try{
        await User.create(req.body);
        res.location('/').status(201).json({ "message": "Account successfully created!" });
    } catch(err){
        if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
            const errors = err.errors.map(error => error.message);
            res.status(400).json({ errors });   
          } else {
            throw err;
          }
        }
    }
 )

 router.get('/courses',async (req,res)=>{
     try{
        const courses = await Course.findAll({
            include:[{
                model:User,
            }]
        });
        res.status(200).json(courses);
     }catch(err){

     }
 })

 router.post('/courses',async (req,res)=>{
    console.log(req.body)
    try{
        await Course.create(req.body);
        const courseId=await Course.findOne({where:{title:req.body.title}});
        res.location(`courses/${courseId.id}`).status(201).json({ "message": "Account successfully created!" });
        // {
        //     "title": "zeeee",
        //     "description":"Godidnhho",
        //     "estimatedTime":"dsadhdasd",
        //     "materialsNeeded":"fdhfsdfdsdf",
        //     "userId":"1"
        // }
    }catch(err){
        if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
            const errors = err.errors.map(error => error.message);
            res.status(400).json({ errors });   
          } else {
            throw err;
          }
        }
})
router.put('/courses/:id',async (req,res)=>{
    try{
        const course= await Course.findByPk(req.params.id);
        await course.update(req.body);
        res.location(`courses/${req.params.id}`).status(204).json({ "message": "Course updated" });
    }catch(err){
        if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
            const errors = err.errors.map(error => error.message);
            res.status(400).json({ errors });   
          } else {
            throw err;
          }
        }
    }
)
router.delete('/courses/:id',async (req,res)=>{
    try{
        const course= await Course.findByPk(req.params.id);
        await course.destroy();
        res.location(`courses`).status(204).json({ "message": "Course updated" });
    }catch(err){
       res.status(400).json({message:"not found"});
    }
})

 router.get('/courses/:id',async (req,res)=>{
    try{
       const course = await Course.findByPk(req.params.id,{
           include:[{
               model:User,
           }]
       });
       res.status(200).json(course);

    }catch(err){

    }
})

module.exports = router;
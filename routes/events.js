const router = require('express').Router();
const { response } = require('express');
const events = require('../data/events')
const Event = require('../models/event')

// Router to create a event 
router.post('/create', async(req,res,next)=>{

    try {

        const event = await Event.create(req.body)
    res.status(200).json({event, msg:"Task is created Task !!! "})
        
    } catch (error) {
        res.json({error})
        
    }
    
  
        
})

//  ROuter to get all events
router.get('/getAllEvents', async(req,res,next)=>{

    try {

        const event = await Event.find()
    res.status(200).json({event, number_Of_Events:event.length})
        
    } catch (error) {
        res.json({error ,message:"Error in getting Events Data"})
        
    }
     
  
        
})

// Get One event By id 

router.get('/getOne/:id',async(req,res,next)=>{
    try {
        
        const {id} = req.params;

    const event = await Event.findById({_id:id});
    res.status(200).json(event)
    } catch (error) {
        res.json({error,message:"Erron in finding one event"})
        
    }



})


// Delete  by id 
router.delete('/deleteEvent/:id', async(req,res,next)=>{

    try {
        const {id} = req.params
        const deletedEvent = await Event.findOneAndDelete({_id: id})

               res.status(200).json({message:"Task is deleted Successfully !!",
                      DeletedEventIs:deletedEvent
         })
        
        
    } catch (error){

        res.json({error ,message:"Error in Deliting  Events "})
        
    }      
})



module.exports = router ;
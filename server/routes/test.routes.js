const express = require('express')
const TestModel = require('../models/test.model')
const testRouter= express.Router()

testRouter.get('/',async (_,res)=>{
    try {
        const tests= await TestModel.find()
        res.status(200).send(tests)
    } catch (error) {
        res.status(500).send(error.message)
    }
})


testRouter.get('/:id',async (req,res)=>{
    try {
        const test= await TestModel.find({_id: req.params.id})
        res.status(200).send(test)
    } catch (error) {
        res.status(500).send(error.message)
    }
})


testRouter.post('/',async (req,res)=>{
    try {
        const test= new TestModel(req.body)
        await test.save()
        res.status(200).send({msg:'test added',test})
    } catch (error) {
        res.status(500).send(error.message)
    }
})


testRouter.delete('/:id',async (req,res)=>{
    try {
        await TestModel.findByIdAndDelete(req.params.id)
        res.status(200).send({msg:'test deleted'})
    } catch (error) {
        res.status(500).send(error.message)
    }
})


testRouter.patch('/:id',async (req,res)=>{
    try {
        await TestModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).send({message:'test edited'})
    } catch (error) {
        res.status(500).send(error.message)
    }
})


module.exports = testRouter
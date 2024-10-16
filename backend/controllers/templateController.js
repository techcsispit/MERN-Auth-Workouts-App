const mongoose=require('mongoose')
const WorkoutTemplate = require("../models/templateModel")

//get single workout template 
const getTemplate=async(req,res)=>{
    const { id }=req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such template'})
    }
    const template=await WorkoutTemplate.findById(id);
    if   (!template){
        return res.status(404).json({error: 'No such template!'})
    }
    res.status(200).json(template)
}
//get all templates
const getTemplates=async(req,res)=>{
    const user_id=req.user._id
    const templates=await WorkoutTemplate.find({user_id}).sort({createdAt:-1})
    res.status(200).json(templates);
}
//create a new template
const createTemplate=async(req,res)=>{
    const {title, exercises}=req.body;

    let emptyFields=[]

    if(!title){
        emptyFields.push('title')
    }
    if(!exercises){
        emptyFields.push('exercises')
    }
    if(emptyFields.length>0){
        return res.status(400).json({error:'Please fill in all the fields', emptyFields})
    }
    const newTemplate=new WorkoutTemplate({
        title,
        exercises,
        user_id:req.user._id
    })
    try{
        const template=await newTemplate.save()
        res.status(200).json(template)
    }
    catch(error){
        res.status(400).json({error:error.message})
    }
}

//update a workout template 
const updateTemplate=async(req,res)=>{
    const { id }=req.params;
    const {title, exercises}=req.body;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such template'})
    }
    const template=await WorkoutTemplate.findById(id);
    if(!template){
        return res.status(404).json({error: 'No such template!'})
    }
    const updatedTemplate=await WorkoutTemplate.findByIdAndUpdate(id,{title, exercises},{new:true})
    res.status(200).json(updatedTemplate)
}
//delete a template
const deleteTemplate = async(req,res)=>{
    const { id }=req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such template'})
    }
    const template= await WorkoutTemplate.findOneAndDelete({_id: id})
    if(!template){
        return res.status(404).json({error: 'No such template!'})
    }
    res.status(200).json({message:'Template deleted successfully'})
}



module.exports = { getTemplate, getTemplates, createTemplate, updateTemplate, deleteTemplate }

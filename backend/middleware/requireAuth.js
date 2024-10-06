const jwt=require('jsonwebtoken')
const User=require('../models/userModel')

const requireAuth=async (req,res,next)=>{
    //verify authentication

    const { authorization }=req.headers
        // its not authorisation, its authorization, thus made the change to req.headers to avoid errors while identifying the <token>  </token>

    if(!authorization){
        return res.status(401).json({error:'Authorisation token required'})
    }

    const token=authorization.split(' ')[1];
    try{
        const {_id}=jwt.verify(token, process.env.JWT_SECRET)
        //used JWT_SECRET instead of SECRET to avoid confusion with the secret key used in env file
        req.user=await User.findOne({_id}).select('_id')
        next()
    }catch(error){
        console.log(error)
        res.status(401).json({error:'Request is not authorised'})
    }
}

module.exports=requireAuth;


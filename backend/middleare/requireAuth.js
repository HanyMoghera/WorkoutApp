const jwt= require('jsonwebtoken');
const User = require('../models/userModle');
require('dotenv').config();

const requireAuth =async (req, res, next)=>{

// verify authentication 
const { authorization }=req.headers;

if(!authorization){
    return res.status(401).json({
        error:"Authrization token is required"
    })
}

const token = authorization.split(' ')[1];

try{

   const {_id} = jwt.verify(token, process.env.SECTET)

   req.user = await User.findOne({_id}).select('_id')
   next()

}catch(error){
 console.log(error)
 res.status(401).json({
    error: "Request is not authorized"
 })
}
}

module.exports = requireAuth;
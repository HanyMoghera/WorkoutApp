const User = require('../models/userModle');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const createToken = (_id)=>{
 return jwt.sign({_id},process.env.SECTET, {expiresIn: '3d'})
}


// logging user 

const loginUser = async(req, res)=>{

    const {email, password} = req.body

    try{
        const user = await User.login(email, password);
          if(user){
            console.log('Logged in Successfully')
         }
        const token = createToken(user._id);

         res.status(200).json({email, token})

    }catch(error){
         res.status(400).json({
            error: error.message
        })
    }
}


// signup users 
const signupUser = async(req, res)=>{

    const {email , password} = req.body


    try{
         const user = await User.signup(email, password)
         
         // create a token 
         const token = createToken(user._id);

         res.status(200).json({email, token})


    }catch(error){
        res.status(400).json({
            error: error.message
        })
    }


}

module.exports = {
    loginUser,
    signupUser
}

const mongoose = require('mongoose');4
const bcrypt = require('bcrypt');
const validator = require('validator');

const Schema = mongoose.Schema

const userSchema = new Schema({

    email: {
        type: String,
        require: true,
        uniqued: true
    },
     password: {
        type: String,
        uniqued: true,
    }
})


// create signup method 
userSchema.statics.signup = async function(email, password){

    // validation 
    if(!email || !password){
        throw Error('All fields must be filled')
    }
    if(!validator.isEmail(email)){
        throw Error('Email is not valid')
    }
    if(!validator.isStrongPassword(password)){
        throw Error('password is not strong enough')
    }

    const exists = await this.findOne({email})

    if(exists){
        throw Error("Email already in use")
    }

    // hash the password 
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    const user = await this.create({email, password: hash})

    return user
}


// create Login Method 

userSchema.statics.login = async function(email, password){

  // validation 
    if(!email || !password){
        throw Error('All fields must be filled')
    }

    const user = await this.findOne({email});

    if(!user){
        throw Error('Incorrect email!')
    }

    const match = await bcrypt.compare(password, user.password);

    if(!match){
         throw Error('Incorret password')
    }

    return user
}



module.exports = mongoose.model('User', userSchema);
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: 'name is required',
        minlength:4
    },
    email:{
        type : String,
        required: 'Email is required',
        lowercase: true,
        unique: true
    },
    password:{
        type : String,
        required: 'Password is required',
        minlength:8
    },
    active:{
        type : Boolean,
    },
    role:{
        type : String,
    }
})

const User = mongoose.model('User',userSchema)

module.exports = User
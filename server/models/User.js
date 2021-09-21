import mongoose from 'mongoose';


const userScheme = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
})


export const userModel = mongoose.model('User', userScheme)

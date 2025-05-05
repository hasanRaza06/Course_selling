import mongoose, { isObjectIdOrHexString } from 'mongoose';

const adminSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        min:3
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    phoneNumber:{
        type:String,
        required:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        trim:true
    },
    role:{
        type:String,
        required:true,
        enum:['super','admin'],
        default:'user'
    },
    publishedCourses:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'course'
    }]
},{timestamps:true});

export const Admin=mongoose.model('admin',adminSchema);
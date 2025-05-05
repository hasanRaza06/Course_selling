import mongoose, { isObjectIdOrHexString } from 'mongoose';

const userSchema=new mongoose.Schema({
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
    purchasedCourses:[{
        courseId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Course'
        },
        progress: [{
            dayNumber: Number,
            completed: {
                type: Boolean,
                default: false
            }
        }]
    }]
},{timestamps:true});

export const User=mongoose.model('user',userSchema);
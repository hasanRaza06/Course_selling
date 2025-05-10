import { generateTokenAdmin } from '../../lock/token.js'
import {Admin} from '../../models/model.admin.js'
import bcrypt from 'bcryptjs'

export const adminSignup=async(req,res)=>{
    try {
        const {name,email,password,phoneNumber,role}=req.body
        const existingUser=await Admin.findOne({
            $or:[{email},{phoneNumber}]
        })
        if(existingUser){
            return res.status(400).json({success:false,message:"User Already Exist change email or phone number"})
        }
        const hashedPassword=await bcrypt.hash(password,10);
        const newAdmin=await Admin.create({
            name,
            email,
            password:hashedPassword,
            phoneNumber,
            role
        })
        const token=generateTokenAdmin(user);
        return res.status(201).json({success:true,message:"Admin Created Successfully",user:newAdmin,token:token});
    } catch (error) {
        return res.status(500).json({success:false,message:"Internal server error "+error.message})
    }
}

export const adminLogin=async(req,res)=>{
    try {
        const {identifier,password}=req.body;
        const user=await Admin.findOne({
            $or:[{email:identifier},{phoneNumber:identifier}]
        })
        if(!user){
            return res.status(400).json({success:false,message:"Invalid Credentials : User not found"})
        }else{
            const isMatch=await bcrypt.compare(password,user.password);
            if(!isMatch){
                return res.status(400).json({success:false,message:"Incorrect Password"})
            }
            const token=generateTokenAdmin(user);
            return res.status(200).json({success:true,message:"Admin logged in successfully",token:token});
        }
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Internal server error "+error.message
        })
    }
}
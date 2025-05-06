import { User } from "./user.model.js";
import { userAuthenticate } from "../../lock/userMiddleware.js";
import bcrypt from "bcryptjs";
import { generateTokenUser } from "../../lock/token.js";

export const userSignup = async (req, res) => {
  try {
    const { name, email, password, phoneNumber } = req.body;
    if(!name || !email || !password || !phoneNumber) {
        return res.status(400).json({success:false, message: "Please fill in all fields" });
    }
    const user = await User.findOne({
      $or: [{ email }, { phoneNumber }],
    });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "User Already Exist change email and phone number",
      });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({
        name,
        email,
        password: hashedPassword,
        phoneNumber,
      });
      const token = generateTokenUser(newUser);
      return res.status(201).json({
        success: true,
        message: "User Created Successfully",
        token,
        user: newUser,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error " + error,
    });
  }
};

export const userLogin = async (req, res) =>{
    try {
        const {identifier,password}=req.body;
        if(!identifier || !password) {
            return res.status(400).json({success:false, message: "Please fill in all fields" });
        }
        const user=await User.findOne({
            $or:[{email:identifier},{phoneNumber:identifier}]
        })

        if(!user){
            return res.status(400).json({success:false, message: "User Not Found" })
        }else{
            const isMatch=await bcrypt.compare(password,user.password);
            if(!isMatch){
                return res.status(400).json({success:false, message: "Invalid Password" })
            }else{
                const token=generateTokenUser(user);
                return res.status(200).json({
                    success:true,
                    message: "User Login Successfully",
                    token,
                    user:user
                })
            }
        }

    } catch (error) {
        return res.status(500).json({
            success: false,
            message:"Internal Server Error "+error
        })
    }
}

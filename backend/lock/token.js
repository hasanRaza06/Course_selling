import jwt from 'jsonwebtoken';

export const generateTokenUser=(user)=>{
    const token=jwt.sign({
        userId:user._id
    },process.env.SECRET_KEY);
    return token;
}

export const generateTokenAdmin=(user)=>{
    const token=jwt.sign({
        user:user
    },process.env.SECRET_KEY);
    return token;
}
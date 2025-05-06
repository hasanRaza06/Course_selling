import jwt from 'jsonwebtoken';

export const adminAuthenticate=(req,res,next)=>{
    const authHeader=req.headers.authorization;
    if(!authHeader) return res.status(401).send({message:'No token provided'});
    const token=authHeader.split(' ')[1];
    try {
        const decode=jwt.verify(token,process.env.SECRET_KEY);
        req.user=decode.user;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
}
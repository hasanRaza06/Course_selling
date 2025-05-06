import jwt from 'jsonwebtoken';

export const userAuthenticate=(req,res,next)=>{
        const authHeader=req.headers.authorization;
        if(!authHeader || !authHeader.startsWith('Bearer ')){
            return res.status(403).json({message: "Forbidden: No token provided"});
        }
        const token=authHeader.split(" ")[1];
        try {
            const decode=jwt.verify(token,process.env.SECRET_KEY);
            req.userId=decode.userId;
            next();
        } catch (error) {
            return res.status(401).json({ message: "Unauthorized: Invalid token" });
        }
}
export const authorizedRoled=(...allowedRoles)=>{
    return (req,res,next)=>{
        if(!allowedRoles.includes(req.user.role)){
            return res.status(404).json({success:false,message:"Access Deniend !"});
        }
        next();
    }
}
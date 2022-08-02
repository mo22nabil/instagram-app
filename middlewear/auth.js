const jwt = require("jsonwebtoken");
const userModel = require("../DB/model/User");
const Roles = {
    User : 'User',
    Admin : 'Admin',
    Hr : 'Hr'
}


const  auth =(accessRoles)=>{

return async (req,res,next)=>{
        try {
            const headerToken = req.headers.authorization ; 
            
                const token = headerToken.split(' ')[1];
                
                const decoded = jwt.verify(token , process.env.tokenSecret)
                if (!decoded || !decoded.isLoggedIn) {
                    res.status(403).json({message:"in-valaid token"});
                    
                } else {
                    const findUser  = await userModel.findById(decoded.id).select('userName email role');
                    if (!findUser) {
                        res.status(404).json({message:"in-valaid user account"});
                        
                    } else {
                        if (accessRoles.includes(findUser.role)) {
                            req.user = findUser;
                            next()
                        } else {
                            res.status(401).json({message:"not authorized user "});
                        }
                    }
                }
            
        } catch (error) {
            res.status(500).json({message:"catch 12error",error});
        }
    }
}

module.exports = {
    auth,
    Roles
}
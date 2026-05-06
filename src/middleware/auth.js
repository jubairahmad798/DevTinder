
const jwt  = require("jsonwebtoken");
const User = require("../models/user");


const userAuth = async(req, res, next)=>{
   
    
    try {
        const {token} = req.cookies ;

        if(!token){
            throw new Error("Token not valid , Please login");
            
        }

      const decodeObj = await jwt.verify(token, process.env.JWT_PRIVATE_KEY);

      const{_id} = decodeObj;
      const user = await User.findById(_id);
      if(!user){
        throw new Error("user not found !");
        
      }

      //attaching user to req and use in api
      req.user = user;
      next();
        
    } catch (err) {
        res.status(404).send("Error : "+err.message);
        
    }
}

module.exports ={
      userAuth
}
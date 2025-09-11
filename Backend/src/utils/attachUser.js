import { verifyToken } from "./helper.js";
import { findUserById } from "../dao/user.dao.js";

export const attachUser = async (req, res, next) => {
   const token = req.cookies.accessToken;
   if (!token) 
       return next();
    console.log(token, "this is token");
       
   try {
       const decoded = verifyToken(token);
       console.log(decoded);
       const user = await findUserById(decoded);
       console.log(user, "this one");
       if (!user) {
           return next();
       }    
       req.user = user;
       next();
   } catch (error) {
       next();
   }
}
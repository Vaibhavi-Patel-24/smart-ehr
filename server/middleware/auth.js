import jwt from 'jsonwebtoken'
import dotenv from "dotenv";

dotenv.config();

const SECRET_KEY = process.env.JSON_KEY;
const auth = (req,res,next) => {
    try{
         // Get token from Authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Access Denied. No token provided. login again" });
    }

    const token = authHeader.split(" ")[1]; // Remove "Bearer "
    console.log(token)

    // Verify the token
    const decoded = jwt.verify(token, SECRET_KEY);

    // Attach user info to request object
    req.userId = decoded.id;
    req.userEmail = decoded.email;
    console.log(decoded)

    // Proceed to next middleware/route
    console.log("authorized");
    next();
    }catch{
        return res.status(403).json({ message: "Invalid or expired token , login again." });
    }

}

export default auth;
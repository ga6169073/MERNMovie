import jwt from "jsonwebtoken";
import User from "../Models/User.js";
import asyncHandler from "express-async-handler";
// @desc Authenticated user & get token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
    })
}

// protection middlewares
const protect = asyncHandler(async (req, res, next) => {
    let token;
    // check if token existed in header
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        // Set token from bearer token in header
        try {
            token = req.headers.authorization.split(" ")[1]
            // verify token and get user id
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            // get user id from decoded token
            req.user = await User.findById(decoded.id).select("-password")
            next();
        } catch (error){
            if(error.name === "TokenExpiredError"){
                res.status(401)
                throw new Error("Not authorized, token expired")
            }
            console.error(error);
            res.status(401)
            throw new Error("Not authorized, token not matched")
        }
    }
    // if token doesn't existed in header send error
    if(!token){
        res.status(401);
        throw new Error("Not authorized, token not found")
    }
})


// admin middlewares
const admin = (req, res, next) => {
    if(req.user && req.user.isAdmin){
        next();
    } else {
        res.status(401);
        throw new Error("Not authorized as an admin")
    }
}
export { generateToken, protect, admin }
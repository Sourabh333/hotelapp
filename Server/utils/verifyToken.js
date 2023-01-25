import jwt from "jsonwebtoken";
import { createError } from "./error.js";

export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token){
        console.log("not_a_token")
        return next(createError(401, " You are not authorized"));
    }
    jwt.verify(token, process.env.JWT, (err, user) => {
        console.log("verified_a_token", user)
        if (err) return next(createError(403, "Token is invalid"));
        req.user = user;
        next();
    })
}

export const verifyUser = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.id == req.params.id || req.user.isAdmin)
            next();
        else
            return next(createError(403, "You are not authorized"));
    })
}
export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, next, () => {
        console.log(req.user.isAdmin);
        if (req.user.isAdmin)
            next();
        else
            return next(createError(403, "You are not a Admin"));
    })
}
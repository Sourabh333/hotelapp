import express, { response } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import hotels from "./routes/hotels.js";
import users from "./routes/user.js";
import rooms from "./routes/rooms.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import path, { dirname } from "path";
dotenv.config();
const app = express();

const dirName = path.dirname("");
const buildPath = path.join(dirName,"../Client/build");
/* DATABASE */
const mongoUrl = process.env.MONGO;
mongoose.connect(mongoUrl);
var connection = mongoose.connection;

connection.on('error', (err) => {
    throw err;
})

connection.on('connected', () => {
    console.log('Connetion to MongoDB successful');
});
connection.on('disconnected', () => {
    console.log('Connetion to MongoDB revoked');
});


/* MIDDLEWARES */
app.use(cors())
app.use(express.static(buildPath));
app.use(cookieParser())
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", users);
app.use("/api/hotels", hotels);
app.use("/api/rooms", rooms);
app.get("/",(req,res)=>{
res.sendFile(
    path.join(__dirname,"../Client/build/index.html"),
(err)=>{
    if(err){
        res.status(500).send(err);
    }
})
})


// error handler
app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong";

    return res.status(errorStatus).json({
        success : false,
        status : errorStatus,
        message : errorMessage,
        stack : err.stack  
    });
});
app.listen(8080, () => {
    console.log("Srever started | Port : 8080");
});

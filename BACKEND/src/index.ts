import express, {Express ,Request, Response} from "express";
import routes from "./routes";
import { json } from "body-parser";
import errorHandler from "./middleware/errorHandler"
import mongoose, { ConnectOptions } from "mongoose"
import * as dotenv from 'dotenv'

dotenv.config({path:__dirname+"/../.env"})
const env = process.env

const app : Express =  express()
// enables express handling JSON requests
app.use(json())
// set routes
app.use("/",routes)

if(env.NODE_ENV !== "production") console.log("App listening on: "+"http://localhost:"+env.PORT)

// tries to connect to database and if it succeeds starts the server
try{
    mongoose.connect(process.env.MONGODB_URI!)
    app.listen(env.PORT)
}catch(err){
    console.log("error connecting with database: \n"+err)
}
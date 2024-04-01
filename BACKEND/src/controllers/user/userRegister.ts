import { Request, Response} from "express";
import User from "../../model/user";
const shortId = require("../../helpers/shortMongoID")
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import filterUserForToken from "../../helpers/filterUserForToken";

//handle user registration attempts
export default async function userRegisterController(req: Request, res: Response){
    // FILTER EMPTY BODY REQUESTS
    if (!(req.body.username && req.body.password)) res.status(400).send("Invalid os Missing Data")
    // EXTRACT REQUEST INFO
    let username:string = req.body.username.toLowerCase()
    let password:string = req.body.password
    // tries to create a user with given data
    try{
        // ENCRYPT USER PASSWORD
        const encryptedPassword = await bcrypt.hash(password, 10)
        // CREATE USER on DATABASE
        const user = await User.create({username:username, password:encryptedPassword})
        // ADD USER SHORT ID 
        user.userID = shortId(user._id)
        // FILTER ONLY RELEVANT DATA FOR TOKEN
        const filteredUser = filterUserForToken(user)
        // GENERATE A JSON WEB TOKEN BASED ON CREATED USER 
        const hash = process.env.SECRET_HASH as string      
        const token = jwt.sign(JSON.stringify(filteredUser), hash)
        // SEND BACK THE CREATED USER RELEVANT DATA AND TOKEN
        res.status(201).json({
            username:filteredUser.username,
            userID:filteredUser.userID,
            token:token
        })
    }catch(error: any){
        console.log(error)
        res.status(400).json({
            message: error.message,
            error: error,
        })
    }
}

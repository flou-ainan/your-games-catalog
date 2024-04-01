import { Request, Response } from "express";
import User from "../../model/user"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import filterUserForToken from "../../helpers/filterUserForToken";

//handle user login attempts
export default async function userLoginController(req: Request, res: Response){
    // CHECK FOR MISSING DATA
    if (!(req.body.username && req.body.password))  res.status(400).send("Invalid os Missing Data")
    // EXTRACT REQUEST INFO    
    let givenUsername = req.body.username.toLowerCase()
    let givenPassword = req.body.password
    try{ // SEARCH FOR THE USERNAME ON DATABASE
        const userDoc = await User.where("username").equals(givenUsername)
         // IF USER IS NOT FOUND RESPOND WITH 404 STATUS CODE
        if (userDoc.length != 1){res.status(404).json({message:`User not Found`})}
        const dbUser = userDoc[0]
        // CHECKS GIVEN PASSWORD
        const result = await bcrypt.compare(givenPassword, dbUser.password as string)
        // RESPOND STATUS 400 IF THE PASSWORD DONT MATCH
        if(!result) res.status(400).json({message: "Incorrect password"})
        // FILTER ONLY RELEVANT DATA FOR TOKEN CREATION
        const filteredUser = filterUserForToken(dbUser)
        // CREATE A JSON WEB TOKEN BASED ON USER DATA AND SEND IN THE RESPONSE
        const token = jwt.sign(filteredUser, process.env.SECRET_HASH as string)
        res.json({
            message:`Welcome ${dbUser.username}! | Youre Logged in`,
            token: token
        })
    }catch(error:any){
        console.log(error)
        res.status(400).send({Message: error.message, error:error})
    }          
}

// checks if given user password matches databaseUser "encrypted password"
function checkPassword(dbUser: any, givenPassword:string, res:Response){
    if (dbUser.password === givenPassword){
        console.log("User: "+dbUser)
        const hash = process.env.SECRET_HASH as string
        const token = jwt.sign(JSON.stringify(dbUser), hash)
        res.status(200).json({
            message:`Welcome ${dbUser.username}! | Youre Logged in`,
            token: token
        })
    }else{
        res.status(400).json({message: "Incorrect password"})
    }
}
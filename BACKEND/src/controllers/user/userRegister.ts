import { Request, Response} from "express";
import User from "../../model/user";
import jwt from "jsonwebtoken"


//handle user registration attempts
export default async function userRegisterController(req: Request, res: Response){
    if (req.body.username && req.body.password){

        let username:string = req.body.username.toLowerCase()
        let password:string = req.body.password
        
        // console.log(hash)
        //tries to create a user with given data
        try{
            const user = await User.create({
                username:username,
                password:password
            })
            console.log("from user register:\n" +user)
            //  user created successfully
            let hash = process.env.SECRET_HASH as string
            const token = jwt.sign(JSON.stringify(user), hash)
            res.status(201).json({
                user:user,
                token:token
            })
        }catch(error){
            console.log(error)
            res.status(400).json({
                message:"Error while trying to write to database",
                error: error,
            })
        }
    }else{
        res.status(400).send("Invalid os Missing Data")
    }   
    
}
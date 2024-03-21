import { Request, Response } from "express";
import User,{userSchema} from "../model/user"
import jwt from "jsonwebtoken"

//handle user login attempts
export default async function userLoginController(req: Request, res: Response){

    // check data
    if (req.body.username && req.body.password){
        let username = req.body.username
        let password = req.body.password

        // To-DO try to login
        try{
            const userDoc = await User.where("username").equals(username)
            if (userDoc.length == 1){ // if == 0 means the query didn't match any doc
                const user = userDoc[0]
                if (user.password === password){
                    console.log("User: "+user)
                    const hash = process.env.SECRET_HASH as string
                    const token = jwt.sign(JSON.stringify(user), hash)
                    res.status(200).json({
                        message:`Welcome ${username}! | Youre Logged in`,
                        token: token
                    })
                }else{
                    res.status(400).json({message: "Incorrect password"})
                }
            }else{
            res.status(404).json({
                message:`User not Found`
                })
            }
        }catch(error){
            console.log(error)
            res.status(400).send({Message: "Database Error", error:error})
        } 
    }else{
        res.status(400).send("Invalid os Missing Data")
    }
          
}

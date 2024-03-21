import jwt from "jsonwebtoken"
import { Request, Response, NextFunction } from "express"


// Check if the token is valid
export default function checkJWT(req: Request, res: Response, next: NextFunction): any {
    if(!req.body.token) return res.status(400).send("Missing Token")
    const token = req.body.token
    try{
        const user = jwt.verify(token, process.env.SECRET_HASH as string)
        req.body.user = user
        next()
    }catch(error){
        console.log(error)
        res.status(400).send({
            message:"Invalid Web Token",
            error: error
        })
    }
}
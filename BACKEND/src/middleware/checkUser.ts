import User from "../model/user"
import { Request, Response, NextFunction } from "express"
import { userType } from "../model/user"

// Checks if the given user exists on database
export default function checkUser(req: Request, res: Response, next: NextFunction) {
    const userReq = req.body.user as userType
        User.findOne(userReq)
            .then(user => {
                    if (user == null) return res.status(400).json({error:"Token is inconsistent with Database: Couldn't find user"})
                    console.log(user)
                    req.body.user = user
                    next()
            },
            // catch
            (error)=> {
                console.log(error)
                res.status(400).send({
                        message: "Token is Inconsistent with Database",
                        error:error
                    })
            })

}
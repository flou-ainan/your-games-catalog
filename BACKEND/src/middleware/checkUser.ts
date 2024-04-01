import User from "../model/user"
import { Request, Response, NextFunction } from "express"
import { userType } from "../model/user"
import filterUserForToken from "../helpers/filterUserForToken"

// Checks if the given user exists on database
export default function checkUser(req: Request, res: Response, next: NextFunction) {
    const data = req.body.user as userType
    
    // selects only data important for validation
    const user = filterUserForToken(data)

    User.findOne(user)
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
                    message: "Token is Inconsistent with Database, go to login page and try again.",
                    error:error
                })
        })

}
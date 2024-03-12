import { Request, Response } from "express";

//handle user registration attempts
export default function userRegisterController(req: Request, res: Response){
    res.send("User Registration Attemp Detected")
}
import { Request, Response } from "express";

//handle user login attempts
export default function userLoginController(req: Request, res: Response){
    res.send("User Login Attemp Detected")       
}
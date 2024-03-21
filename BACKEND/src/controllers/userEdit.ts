import { Request, Response } from "express";

//handle user edit attempts
export default function userEditController(req: Request, res: Response){
    res.send("User Editing Attempt Detected")
}
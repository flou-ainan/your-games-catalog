import { Request, Response } from "express";

//handle user delete attempts
export default function userDeleteController(req: Request, res: Response){
    res.send("User Delete Attempt Detected")
}
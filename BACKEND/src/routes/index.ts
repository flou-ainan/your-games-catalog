import { Router, Request, Response, NextFunction } from "express";
import userRoutes from "./user";
import checkJWT from "../middleware/checkJWT"
import checkUser from "../middleware/checkUser";


const routes : Router = Router()

routes.use("/user", userRoutes)

routes.get("/check", (req: Request, res: Response) => {
    res.json({serverStatus:"OK"})
})

routes.post("/validate", [checkJWT,checkUser], (req: Request, res: Response) => {
    res.send({user:req.body.user})
})

routes.get("/", (req: Request, res: Response)=>{res.json("Welcome")})
export default routes
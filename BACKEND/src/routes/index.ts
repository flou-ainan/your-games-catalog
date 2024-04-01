import { Router, Request, Response, NextFunction } from "express";
import userRoutes from "./user";
import checkJWT from "../middleware/checkJWT"
import checkUser from "../middleware/checkUser";
import gameRoutes from "./game";


const routes : Router = Router()

routes.use("/user", userRoutes)
routes.use("/game", gameRoutes)

export default routes


// --------------------------------
// -------  testing routes  -------
// --------------------------------

routes.get("/check", (req: Request, res: Response) => {
    res.json({serverStatus:"OK"})
})

routes.post("/validate", [checkJWT,checkUser], (req: Request, res: Response) => {
    res.send({user:req.body.user})
})

routes.get("/", (req: Request, res: Response)=>{res.json("Welcome")})

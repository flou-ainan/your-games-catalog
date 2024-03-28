import { Router } from "express";
import handleGameCreate from "../controllers/game/gameCreate"
import handleGameGet from "../controllers/game/gameGet"
import checkJWT from "../middleware/checkJWT";
import checkUser from "../middleware/checkUser";

const gameRoutes = Router()

gameRoutes.post('/new',checkJWT,checkUser, handleGameCreate)
gameRoutes.get('/',checkJWT,checkUser, handleGameGet)

export default gameRoutes
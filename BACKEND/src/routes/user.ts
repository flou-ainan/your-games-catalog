import { Router } from "express";
import handleUserLogin from "../controllers/userLogin"
import handleUserRegister from "../controllers/userRegister"
import handleUserEdit from "../controllers/userEdit"
import handleUserDelete from "../controllers/userDelete"

const userRoutes = Router()


userRoutes.post('/login', handleUserLogin)
userRoutes.post('/register', handleUserRegister)
userRoutes.patch('/edit', handleUserEdit)
userRoutes.delete('/delete', handleUserDelete)


export default userRoutes
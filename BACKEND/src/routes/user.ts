import { Router } from "express";
import handleUserLogin from "../controllers/user/userLogin"
import handleUserRegister from "../controllers/user/userRegister"
import handleUserEdit from "../controllers/user/userEdit"
import handleUserDelete from "../controllers/user/userDelete"

const userRoutes : Router = Router()

userRoutes.post('/login', handleUserLogin)
userRoutes.post('/register', handleUserRegister)
userRoutes.patch('/edit', handleUserEdit)
userRoutes.delete('/delete', handleUserDelete)


export default userRoutes
import { Router } from "express";
import { createUser} from "../Controllers/users.controller";
import { verifyToken } from "../Middlewares/verifyToken";

const userRouter = Router()

userRouter.post('/', createUser)

export default userRouter
import { Router } from "express";
import { signup, login, me } from "../controllers/auth";
import { authMiddleware } from "../middleware/auth";


const authRouter = Router();


authRouter.post("/auth/signup", signup);
authRouter.post("/auth/login", login);
authRouter.get("/me", authMiddleware, me); 

export default authRouter;

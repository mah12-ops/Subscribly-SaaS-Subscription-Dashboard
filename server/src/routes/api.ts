import { Router } from "express";
import { signup, login, me } from "../controllers/auth";
import { attachUser } from "../middleware/auth";


const authRouter = Router();


authRouter.post("/auth/signup", signup);
authRouter.post("/auth/login", login);
authRouter.get("/me", attachUser, me); 

export default authRouter;

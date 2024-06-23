import { Router, Request, Response } from "express";
import { SignUp, SignIn } from "../controllers/usuarios";

const route = Router();

route.get("/", (req: Request, res: Response) => {
  res.json({ message: "Hello world!" });
});

route.post("/cadastrar", SignUp);
route.post("/entrar", SignIn);

export { route };

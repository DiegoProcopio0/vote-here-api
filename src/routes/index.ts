import { Router, Request, Response } from "express";
import { UsuarioController } from "../controllers/usuarios";

const route = Router();

route.get("/", (req: Request, res: Response) => {
  res.json({ message: "Hello world!" });
});

route.post("/cadastrar", UsuarioController.SignUp);

export { route };

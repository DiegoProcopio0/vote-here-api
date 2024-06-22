import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { RegisterLoginData, validateRegister } from "../../schemas/login";
import { registerService } from "../../services";

interface IBodyProps extends Omit<RegisterLoginData, "id"> {}

export const SignUp = async (
  req: Request<{}, {}, IBodyProps>,
  res: Response,
) => {
  const { email, senha, nome } = req.body;

  const result = await registerService({ email, senha, nome });

  if (result.isLeft()) {
    return res.status(StatusCodes.BAD_REQUEST).json({ errors: result.value });
  }

  return res.status(StatusCodes.OK).json(result);
};

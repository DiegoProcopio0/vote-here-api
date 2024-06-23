import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import type { LoginData } from "../../schemas/login";
import { authService } from "../../services";

interface IBodyProps extends Omit<LoginData, "id"> {}

export const SignIn = async (
  req: Request<{}, {}, IBodyProps>,
  res: Response,
) => {
  const { email, senha } = req.body;

  const result = await authService({ email, senha });

  if (result.isLeft()) {
    return res.status(StatusCodes.BAD_REQUEST).json({ errors: result.value });
  }

  return res.status(StatusCodes.OK).json({ accessToken: result.value });
};

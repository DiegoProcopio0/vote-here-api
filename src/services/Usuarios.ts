import {
  type RegisterLoginData,
  type LoginData,
  validateRegister,
  validateAuth,
} from "../schemas/login";
import { Usuario } from "../database";
import { Either, left, right } from "../shared/lib/either";
import { JWTService, PasswordCrypto } from "../shared/services";

interface TResponse extends Omit<RegisterLoginData, "senha"> {}

export const registerService = async (
  usuario: RegisterLoginData,
): Promise<Either<string | string[], TResponse>> => {
  const { email, senha } = usuario;

  const validated: Either<string[], boolean> = validateRegister(usuario);

  if (validated.isLeft()) {
    return left(validated.value);
  }

  const checkIfUserExists = await Usuario.findOne({
    where: { email: email },
  });

  if (checkIfUserExists) {
    return left(["O e-mail já está em uso!"]);
  }

  const hashedPassword = await PasswordCrypto.hashPassword(senha);

  const user = {
    ...usuario,
    senha: hashedPassword,
  };

  const userCreate = await Usuario.create(user);

  if (!userCreate) {
    return left(["Não foi possível criar o usuario!"]);
  }

  const response: TResponse = {
    id: userCreate.id,
    nome: userCreate.nome,
    email: userCreate.email,
  };

  return right(response);
};

export const authService = async (
  usuario: LoginData,
): Promise<Either<string[], string>> => {
  const { email, senha } = usuario;

  const validated: Either<string[], boolean> = validateAuth(usuario);

  if (validated.isLeft()) {
    return left(validated.value);
  }

  const result = await Usuario.findOne({
    where: { email: email },
  });

  if (!result) {
    return left(["Email ou senha são inválidos!"]);
  }

  const veriFyPassword = await PasswordCrypto.veriFyPassword(
    senha,
    result.senha,
  );

  if (!veriFyPassword) {
    return left(["Email ou senha são inválidos!"]);
  }

  const accessToken = JWTService.sign({ uid: result.id! });

  if (accessToken === "JWT_SECRET_NOT_FOUND") {
    return left(["Erro ao gerar o token de acesso"]);
  }

  return right(accessToken);
};

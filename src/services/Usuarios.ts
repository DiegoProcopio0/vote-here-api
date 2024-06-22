import { RegisterLoginData, validateRegister } from "../schemas/login";
import { Usuario } from "../database";
import { left, right } from "../shared/lib/either";
import { PasswordCrypto } from "../shared/services";

interface TResponse extends Omit<RegisterLoginData, "senha"> {}

export const registerService = async (usuario: RegisterLoginData) => {
  const { email, senha } = usuario;

  const validated = validateRegister(usuario);

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

  const userCreate: any = await Usuario.create(user);

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

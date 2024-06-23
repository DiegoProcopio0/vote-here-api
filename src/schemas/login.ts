import { z as zod } from "zod";
import { Either, left, right } from "../shared/lib/either";

const registerLoginSchema = zod.object({
  id: zod.number().optional(),
  nome: zod
    .string({
      required_error: "Nome deve ser informado.",
      invalid_type_error: "Nome deve ser uma string.",
    })
    .min(3, { message: "Nome deve ter no mínimo 3 caracteres." }),
  email: zod
    .string({
      required_error: "Email deve ser informado.",
      invalid_type_error: "Email deve ser uma string.",
    })
    .email({ message: "Email deve ser valido." }),
  senha: zod
    .string({
      required_error: "Senha deve ser informada.",
      invalid_type_error: "Senha deve ser uma string.",
    })
    .min(3, { message: "Senha deve ter no mínimo 3 caracteres." }),
});
export type RegisterLoginData = zod.infer<typeof registerLoginSchema>;

const loginSchema = registerLoginSchema.omit({ nome: true });
export type LoginData = zod.infer<typeof loginSchema>;

export const validateRegister = (
  registerLogin: RegisterLoginData,
): Either<string[], boolean> => {
  let errors: string[] = [];

  const validatedData = registerLoginSchema.safeParse(registerLogin);

  if (!validatedData.success) {
    errors = validatedData.error.issues.map((issue) => issue.message);
  }

  if (errors.length > 0) {
    return left(errors);
  }

  return right(true);
};

export const validateAuth = (
  authLogin: LoginData,
): Either<string[], boolean> => {
  let errors: string[] = [];

  const validatedData = loginSchema.safeParse(authLogin);

  if (!validatedData.success) {
    errors = validatedData.error.issues.map((issue) => issue.message);
  }

  if (errors.length > 0) {
    return left(errors);
  }

  return right(true);
};

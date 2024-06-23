import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";
import { sequelize } from "../conn";

interface UsuarioModel
  extends Model<
    InferAttributes<UsuarioModel>,
    InferCreationAttributes<UsuarioModel>
  > {
  id?: number;
  nome: string;
  email: string;
  senha: string;
}

const Usuario = sequelize.define<UsuarioModel>("Usuario", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export { Usuario };

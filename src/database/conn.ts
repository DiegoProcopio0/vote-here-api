import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "database.sqlite",
});

try {
  sequelize.authenticate();
  console.log("Conectamos com sucesso!");
} catch (error) {
  console.log(`Não foi possível conectar ${error}`);
}

export { sequelize };

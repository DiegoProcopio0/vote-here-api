import { Sequelize } from "sequelize";

const sequelize = new Sequelize('vote-here-db', 'root', 'root', {
  host: 'localhost',
  dialect: "mysql"
});

try {
  sequelize.authenticate();
  console.log("Conectamos com sucesso!");
} catch (error) {
  console.log(`Não foi possível conectar ${error}`);
}

export { sequelize };

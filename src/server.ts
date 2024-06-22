import express from "express";
import cors from "cors";
import "dotenv/config";

import { sequelize } from "./database";

import { route } from "./routes";

const app = express();

app.use(
  cors({
    origin: process.env.ENABLED_CORS?.split(";") || [],
  }),
);

app.use(express.json());

app.use(route);

sequelize
  .sync({ force: true })
  .then(() => {
    app.listen(process.env.PORT || 3333, () =>
      console.log(`APP routing in port ${process.env.PORT || 3333}`),
    );
  })
  .catch((error) => console.log(`Não foi possível conectar ${error}`));

export { app };

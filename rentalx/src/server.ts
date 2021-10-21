import "reflect-metadata";
import express from "express";
import swaggerUi from "swagger-ui-express";

import { routes } from "./routes";
import swaggerFile from "./swagger.json";
import "./database";
import "./shared/container";

// Não sera mais necessário importar rotas aqui;
// import { categoriesRoutes } from "./routes/categories.routes";
// import { specificationsRoutes } from "./routes/specifications.routes";

const app = express();

app.use(express.json());

/**
 * Iniciando o swagger
 */
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

// Fazendo o import das rotas no arquivo "routes/index.ts"
app.use(routes);

/**
 * Deixando o "/categories" como path inicial da rota, assim dentro do categoriesRoutes
 * só será preciso passar os demais parametros de rota caso necessario
 *
 * As rotas dessa forma foram comentadas pois refatoramos e criamos o arquivo index.ts
 * possibilitando com que importemos somente o arquivo "routes/index.ts" para utilizar aqui
 */
// app.use("/categories", categoriesRoutes);
// app.use("/specifications", specificationsRoutes);

/**
 * Teste de rota para mostrar como utilizar a ferramenta de debug do VSCode
 */

// app.get("/", (request, response) => {
//   return response.json({ message: "Hello World!" });
// });
// app.post("/courses", (request, response) => {
//   const { name } = request.body;
//   return response.json({ name });
// });

app.listen(3333, () =>
  console.log("Server is running on http://localhost:3333/")
);

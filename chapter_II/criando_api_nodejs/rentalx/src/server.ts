import express from "express";

import { categoriesRoutes } from "./routes/categories.routes";

const app = express();

app.use(express.json());

/**
 * Deixando o "/categories" como path inicial da rota, assim dentro do categoriesRoutes
 * só será preciso passar os demais parametros de rota caso necessario
 */
app.use("/categories", categoriesRoutes);

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

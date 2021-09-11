const { response } = require("express");
const express = require("express");

const app = express();

app.use(express.json());

app.get("/", (request, response) => {
  // return response.send("Olá mundo!");
  return response.json({message: "Olá Mundo!"});

});

// GET
app.get("/cursos", (request, response) => {
  const query = request.query;
  console.log(query);
  return response.json(["Curso 1", "Curso 2", "Curso 3"]);
});

// POST
app.post("/cursos", (request, response) => {
  const body = request.body;
  console.log(body);
  return response.json(["Curso 1", "Curso 2", "Curso 3", "Curso 4"]);
});

// PUT
app.put("/cursos/:id", (request, response) => {
  const { id } = request.params;
  console.log(id);
  return response.json(["Curso 1", "Curso 2", "Curso 3", "Curso 4 Alterado"]);
});

// PATCH
app.patch("/cursos/:id", (request, response) => {
  return response.json(["Curso 1", "Curso 2 Será Deletado", "Curso 3", "Curso 4 Alterado"]);
});

// DELETE
app.delete("/cursos/:id", (request, response) => {
  return response.json(["Curso 1", "Curso 3", "Curso 4 Alterado"]);
});

app.listen(3000);
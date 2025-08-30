const express = require("express");
const bodyParser = require("body-parser");
const funcionariosRoutes = require("./routes/funcionarios");

const app = express();
const PORT = 3000;

// Middlewares
app.use(bodyParser.json());

// Rotas
app.use("/funcionarios", funcionariosRoutes);

// Servidor rodando
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

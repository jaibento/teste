const express = require("express");
const bodyParser = require("body-parser");
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const funcionariosRoutes = require("./routes/funcionarios");

const app = express();
const PORT = 3000;

// Configuração do Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Funcionários',
      version: '1.0.0',
      description: 'API para gerenciamento de funcionários do sistema RH',
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
        description: 'Servidor de desenvolvimento',
      },
    ],
  },
  apis: ['./routes/*.js'], // Caminho para os arquivos com as rotas
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Middlewares
app.use(bodyParser.json());

// Rota da documentação Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rota raiz
app.get("/", (req, res) => {
  res.send("Servidor rodando! Acesse /funcionarios para ver os funcionários ou /api-docs para a documentação.");
});

// Rotas
app.use("/funcionarios", funcionariosRoutes);

// Servidor rodando
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
  console.log(`Documentação Swagger disponível em http://localhost:${PORT}/api-docs`);
});
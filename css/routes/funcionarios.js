const express = require("express");
const router = express.Router();

// Simulação de "banco de dados" em memória
let funcionarios = [];
let idCounter = 1;

// POST - cadastrar funcionário
router.post("/", (req, res) => {
  const { nome, cargo, salario } = req.body;

  if (!nome || !cargo || !salario) {
    return res.status(400).json({ erro: "Preencha todos os campos." });
  }

  const novoFuncionario = {
    id: idCounter++,
    nome,
    cargo,
    salario: parseFloat(salario)
  };

  funcionarios.push(novoFuncionario);

  res.status(201).json({
    mensagem: "Funcionário cadastrado com sucesso!",
    funcionario: novoFuncionario
  });
});

module.exports = router;


const express = require("express");
const router = express.Router();

// Base de dados em memória (exemplo)
let funcionarios = [
  { id: 1, nome: "João" },
  { id: 2, nome: "Maria" }
];

/**
 * @swagger
 * components:
 *   schemas:
 *     Funcionario:
 *       type: object
 *       required:
 *         - nome
 *       properties:
 *         id:
 *           type: integer
 *           description: ID único do funcionário
 *         nome:
 *           type: string
 *           description: Nome do funcionário
 *       example:
 *         id: 1
 *         nome: João Silva
 */

/**
 * @swagger
 * tags:
 *   name: Funcionários
 *   description: API para gerenciamento de funcionários
 */

/**
 * @swagger
 * /funcionarios:
 *   get:
 *     summary: Lista todos os funcionários
 *     tags: [Funcionários]
 *     responses:
 *       200:
 *         description: Lista de funcionários retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Funcionario'
 */
router.get("/", (req, res) => {
  res.json(funcionarios);
});

/**
 * @swagger
 * /funcionarios/{id}:
 *   get:
 *     summary: Busca funcionário por ID
 *     tags: [Funcionários]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do funcionário
 *     responses:
 *       200:
 *         description: Funcionário encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Funcionario'
 *       404:
 *         description: Funcionário não encontrado
 */
router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const funcionario = funcionarios.find(f => f.id === id);
  if (!funcionario) return res.status(404).send("Funcionário não encontrado");
  res.json(funcionario);
});

/**
 * @swagger
 * /funcionarios:
 *   post:
 *     summary: Cria um novo funcionário
 *     tags: [Funcionários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *             properties:
 *               nome:
 *                 type: string
 *                 description: Nome do funcionário
 *             example:
 *               nome: Maria Santos
 *     responses:
 *       201:
 *         description: Funcionário criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Funcionario'
 */
router.post("/", (req, res) => {
  const { nome } = req.body;
  const novoFuncionario = { id: funcionarios.length + 1, nome };
  funcionarios.push(novoFuncionario);
  res.status(201).json(novoFuncionario);
});

/**
 * @swagger
 * /funcionarios/{id}:
 *   put:
 *     summary: Atualiza um funcionário existente
 *     tags: [Funcionários]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do funcionário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 description: Nome do funcionário
 *             example:
 *               nome: João Silva Atualizado
 *     responses:
 *       200:
 *         description: Funcionário atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Funcionario'
 *       404:
 *         description: Funcionário não encontrado
 */
router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const funcionario = funcionarios.find(f => f.id === id);
  if (!funcionario) return res.status(404).send("Funcionário não encontrado");

  const { nome } = req.body;
  funcionario.nome = nome || funcionario.nome;
  res.json(funcionario);
});

/**
 * @swagger
 * /funcionarios/{id}:
 *   delete:
 *     summary: Remove um funcionário
 *     tags: [Funcionários]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do funcionário
 *     responses:
 *       200:
 *         description: Funcionário removido com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Funcionario'
 *       404:
 *         description: Funcionário não encontrado
 */
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = funcionarios.findIndex(f => f.id === id);
  if (index === -1) return res.status(404).send("Funcionário não encontrado");

  const deletado = funcionarios.splice(index, 1);
  res.json(deletado[0]);
});

module.exports = router;
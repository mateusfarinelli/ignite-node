const express = require("express");
const { v4: uuidv4 } = require("uuid");

const app = express();

// Midleware para trabalhar com JSON
app.use(express.json());

// Dados mocados aqui
const clientes = [];

/**
 * Dados da conta
 * id - uuid => Universally unique identifier "npm install uuid" ou "yarn add uuid"
 * cpf - string,
 * nome - string
 * extrato - [] => referente as movimentações bancarias
 */

function verificaClienteExiste(cpf){
  return clientes.find((cliente) => cliente.cpf === cpf);
}

// Criar conta
app.post("/conta", (req, res) => {
  const { nome, cpf } = req.body;

  /**
  * Passei essa variavel como função visando reaproveitamento de código, até aqui foi utilizada essa varaivel 
  * para verificação da existencia do cliente
  * 
  * const clienteExiste = clientes.some((cliente) => cliente.cpf === cpf);
  * if(clienteEciste){...}
  */
  
  
  if(verificaClienteExiste(cpf)) {
    return res.status(400).json({error: "Cliente já cadastrado!"})
  }

  clientes.push({id: uuidv4(), cpf, nome, extrato: []});

  return res.status(201).json(clientes);

});

// Recuperar o extrato do cliente com base no cpf.
// Passando o CPF via header parms (como se fosse um token)
app.get("/extrato", (req, res) => {
  const { cpf } = req.headers

// Passando o CPF via route params
// app.get("/extrato/:cpf", (req, res) => {
  // const { cpf } = req.params;


  const cliente = verificaClienteExiste(cpf);
  
/**
 * O método find é utilizado para retornar objeto cujo o valor da chave comparatoria case com o valor passado
 * Esse método foi criado pela instrutora durante o curso
 * const retorno = clientes.find((cliente) => cliente.cpf === cpf);
 */

  if(!cliente){
    return res.status(400).json({erro: "Cliente não cadastrado!"})
  }
 
  return res.json(cliente.extrato);

});

app.listen(3000);
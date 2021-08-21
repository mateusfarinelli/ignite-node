const { request } = require("express");
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

// Pode ser interessante passar essa função para outro arquivo como um lib de funções uteis
function verificaClienteExiste(cpf){
  return clientes.find((cliente) => cliente.cpf === cpf);
}

/**
 * Neste ponto do curso entendi que a função criada a cima pode ser melhorada e transformada em um middleware
 * Basicamente como faremos uma grande quantidade de verificações iguais e já pensando no proximo passo que seria
 * Uma autenticação como por exemplo utilizando JWT, vamos transformar essa função num middleware.
 * 
 * Basicamente um middleware permite melhor controle sobre o fluxo que o programa vai tomar.
 * Para isso devemos passar 3 parametros para o middleware sendo eles:
 *  - requrest, response e o next (esse ultimo sendo responsavel por guiar o fluxo da execução do código)
 */
function verificarClienteExistenteByCPF(req, res, next){
  const { cpf } = req.headers;

  const cliente = clientes.find((cliente) => cliente.cpf === cpf);

  if(!cliente){
    return res.status(400).json({erro: "Cliente não cadastrado!"})
  }

  // Possibilita o acesso ao cliente recebido pelo middleware nos métodos que o utilizam
  request.cliente = cliente;

  return next();
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
    return res.status(400).json({error: "Cliente já cadastrado!"});
  }

  clientes.push({id: uuidv4(), cpf, nome, extrato: []});

  return res.status(201).json(clientes);

});

// // Recuperar o extrato do cliente com base no cpf - Sem Middleware.
// // Passando o CPF via header parms (como se fosse um token)
// app.get("/extrato", (req, res) => {
//   const { cpf } = req.headers

// // Passando o CPF via route params
// // app.get("/extrato/:cpf", (req, res) => {
//   // const { cpf } = req.params;


//   const cliente = verificaClienteExiste(cpf);
  
// /**
//  * O método find é utilizado para retornar objeto cujo o valor da chave comparatoria case com o valor passado
//  * Esse método foi criado pela instrutora durante o curso
//  * const retorno = clientes.find((cliente) => cliente.cpf === cpf);
//  */
//  if(!cliente){
//   return res.status(400).json({erro: "Cliente não cadastrado!"})
// }
 
//   return res.json(cliente.extrato);

// });

/**
 * Recuperar o extrato do cliente com base no cpf - Com Middlewares
 * É possivel passar varios middlewares, basta passa-los antes do (req, res).
 * Também é intessante ressaltar que se caso todas as rotas fossem utilizar o middleware poderiamos fazer antes de todas as rotas algo como:
 * 
 * app.use(middleware)
 * 
 * Caso somente algumas rotas utilizarem o middleware deve-se passar manualmente em cada uma delas conforme exemplo
 */
app.get('/extrato', verificarClienteExistenteByCPF, (req, res) => {
  // Recebendo o cliente pelo middleware
  const { cliente } = request; 

  return res.json(cliente.extrato);
});

app.listen(3000);
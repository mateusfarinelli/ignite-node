const { request, response } = require("express");
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


function verificarClienteExistenteByCPF(req, res, next){
  /**
 * Neste ponto do curso entendi que a função criada a cima pode ser melhorada e transformada em um middleware
 * Basicamente como faremos uma grande quantidade de verificações iguais e já pensando no proximo passo que seria
 * Uma autenticação como por exemplo utilizando JWT, vamos transformar essa função num middleware.
 * 
 * Basicamente um middleware permite melhor controle sobre o fluxo que o programa vai tomar.
 * Para isso devemos passar 3 parametros para o middleware sendo eles:
 *  - requrest, response e o next (esse ultimo sendo responsavel por guiar o fluxo da execução do código)
 */
  const { cpf } = req.headers;

  const cliente = clientes.find((cliente) => cliente.cpf === cpf);

  if(!cliente){
    return res.status(400).json({erro: "Cliente não cadastrado!"})
  }

  // Possibilita o acesso ao cliente recebido pelo middleware nos métodos que o utilizam
  request.cliente = cliente;

  return next();
}

function getBalancoBancario(extrato){
  /**
   * Função criada para validar o balanço entre operações de deposito e saque da conta
   * O operador reduce é uma função pronta do JS que retorna a soma dos valores passados.
   * Nessa função passamos 3 operadores, o primeiro é o acumulador, que sera utilziado como variavel
   * para guardar o valor dessa soma, o objeto que sera utilziado para realizar a soma e por fim o 
   * valor inicial do acumulador que nesse caso setamos como 0
   */
  const balanco = extrato.reduce((acumulador, operacaoBancaria) => {
    if(operacaoBancaria.tipo === "credito"){
      return acumulador + operacaoBancaria.quantia;      
    } else {
      return acumulador - operacaoBancaria.quantia;
    } 
  }, 0);

  return balanco;
}


app.post("/conta", (req, res) => {
  // Criar conta
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

app.get("/extrato", verificarClienteExistenteByCPF, (req, res) => {
/**
 * Recuperar o extrato do cliente com base no cpf - Com Middlewares
 * É possivel passar varios middlewares, basta passa-los antes do (req, res).
 * Também é intessante ressaltar que se caso todas as rotas fossem utilizar o middleware poderiamos fazer antes de todas as rotas algo como:
 * 
 * app.use(middleware)
 * 
 * Caso somente algumas rotas utilizarem o middleware deve-se passar manualmente em cada uma delas conforme exemplo
*/

  // Recebendo o cliente pelo middleware
  const { cliente } = req; 

  return res.json(cliente.extrato);
});


app.post("/deposito", verificarClienteExistenteByCPF, (req, res) => {
/**
 * Fazendo operação de depósito
 * Nesse exemplo vemos como fazer um post passando body params e passando o CPF no header param,
 * É importante lembrar de passar o Content-Type Application/json no header pois se não os dados descrição e quantia
 * que sao recebidos como json não serão validados.
*/
  const { descricao, quantia } = req.body;

  const { cliente } = req;

  const operacaoBancaria = {
    descricao,
    quantia,
    data_movimentacao: new Date(),
    tipo: "credito"
  };

  cliente.extrato.push(operacaoBancaria);

  return res.status(201).json(cliente);
});

app.post("/saque", verificarClienteExistenteByCPF, (req, res) => {
  /**
   * Método de saque da conta
   * Utilizamos a função getBalancoBancario que criamos anteriormente para validar o saque
   */
  const { quantia } = req.body;
  const { cliente } = req;

  const balanco = getBalancoBancario(cliente.extrato);

  if(balanco < quantia){
    return res.status(400).json({error: "Saldo insuficiente!"})
  }
  const operacaoBancaria = {
    quantia,
    data_movimentacao: new Date(),
    tipo: "debito"
  };

  cliente.extrato.push(operacaoBancaria);

  return res.status(201).json(cliente);
});

app.get("/extrato/data", verificarClienteExistenteByCPF, (req, res) => {
  /**
   * Recuperar o extrato do cliente com base na data passada
   * Iremos receber essa data pelos query params(ou seja, valores opcionais passados nas rotas)
  */
  const { data } = req.query;
  // Recebendo o cliente pelo middleware
  const { cliente } = req;

  /**
   * Para que não nos preocupemos com a hora da data string utilizamos o " 00:00" setar a hora 00:00 da string
   */
  const dataFormatada = new Date(data + " 00:00");
  console.log(dataFormatada.toDateString());
  
  /**
   * O método filter é um método pronto qe retorna um array contendo os elementos filtrados do array base
   * É utilizado com o retorno direto sobre o array.
   */
  const extrato = cliente.extrato.filter((extrato) => 
    extrato.data_movimentacao.toDateString() === dataFormatada.toDateString()
  );
    
  return res.json(extrato);
});

app.put("/conta", verificarClienteExistenteByCPF, (req, res) => {
  const { nome } = req.body;
  const { cliente } = req;

  cliente.nome = nome;

  return res.status(201).json(cliente);

});

app.get("/conta", verificarClienteExistenteByCPF, (req, res) => {
  const { cliente } = req;

  return res.status(200).json(cliente);
});

app.delete("/conta", verificarClienteExistenteByCPF, (req, res) => {
  /**
   * Metodo para remoção de contas
   * 
   * Vamos utilizar o método splice que recebe 2 parametros, o primeiro é o objeto que quermos remover
   * o segundo é a quantidade de objetos que devem ser removidos a partir do objeto informado (no caso somente 1 o proprio objeto)
   */
  const { cliente } = req;

  clientes.splice(cliente, 1);

  return res.status(200).json(clientes);
});

app.get("/balanco", verificarClienteExistenteByCPF, (req, res) => {
  /**
   * Método para retorno do balanco bancario
   */
  const { cliente } = req;

  const balanco = getBalancoBancario(cliente.extrato);

  return res.status(200).json(balanco);
})

app.listen(3000);
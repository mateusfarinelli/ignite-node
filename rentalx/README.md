**RF -> Requisitos Funcionais**
- Funcionalidades que aplicação terá
- Geralmente um requisito funcional trás a ideia de possibilidade de uma ação "Deve ser possível..."

**RNF -> Requisitos Não Funcionais**
- Requisitos que não estão ligados diretamente a regra de negócio

**RN -> Regra de Negócio**
- São as regras por trás dos requisitos


# Cadastro de Veículo
**RF**
- Deve ser possível cadastrar um novo veículo;
- Deve ser possível listar todas as categorias;

**RNF**
- Até o momento não vemos nenhum requisito não funcional para cadastro de veículos (28/01/2022);

**RN**
- Não deve ser possível cadastrar varios veículos com a mesma placa;
- Não deve ser possível alterar a placada de um veículo já cadastrado;
- Carro deve ser cadastrado como sendo disponivel por padrão;
- Somente usuários administradores podem realizar o cadastro de um novo veículo;

# Listagem de Veículos
**RF**
- Deve ser possível listar todos os veículos disponiveis;
- Dever ser possível listar todos os carros com base na categoria selecionada;
- Dever ser possível listar todos os carros com base no nome da marca selecionada;
- Dever ser possível listar todos os carros com base no nome do carro;

**RNF**
- Até o momento não vemos nenhum requisito não funcional para cadastro de veículos (28/01/2022);

**RN**
- Não é necessário que o usuário esteja logado;


# Cadastro de Especificações do Veículo
**RF**
- Deve ser possível cadastrar uma especificação para um veículo;
- Deve ser possível listar todas as especificações cadastradas;
- Deve ser possível listar todos os veículo cadastrados;

**RNF**
- Até o momento não vemos nenhum requisito não funcional para cadastro de veículos (28/01/2022);

**RN**
- Não deve ser possível criar uma especificação para um veículo não cadastrado;
- Não deve ser possível criar especificações já existentes para o mesmo veículo.
- Somente usuários administradores podem realizar o cadastro de uma nova especificação;

# Cadastro de Imagens do Veículo
**RF**
- Deve ser possível cadastrar a imagem do carro;
- Deve ser possível listar todos os carros;

**RNF**
- Utilizar o multer para upload dos arquivos;

**RN**
- O usuário deve poder cadastrar mais de uma imagem para o mesmo carro;
- Somente usuários administradores podem realizar o cadastro de uma nova imagem;

# Aluguel de Veículo
**RF**
- Deve ser possível cadastrar um aluguel;

**RN**
- O aluguel deve ter duração mínima de 24 horas;
- Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo usuário;
- Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo veículo;
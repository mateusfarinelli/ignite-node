// Recebendo as informações necessárias conforme DTO criado no repository

import { CategoriesRepository } from "../repositories/CategoriesRepository";

interface RequestInterface {
  name: string;
  description: string;
}

/**
 * O que foi feito aqui:
 * [X] - Definir o tipo de retorno
 * [X] - Alterar o retorno de erro (service não precisa conhecer response, já que não é sua responsabilidade)
 * [X] - Acessar o repository
 *      Instanciar o repository aqui não é interessante se pensarmos em varios services fazendo o mesmo
 *      já que teriamos para cada um deles uma nova inicialização do Array dado o construtor da classe,
 *      assim nunca teriamos acesso a mesma instancia do repositório e para isso vamos aplicar o DIP
 *      Dependency Inversion Principle (veja nas anotações)
 */

class CreateCategoryService {
  // "Implementado o DIP"
  constructor(private categoriesRepository: CategoriesRepository) {}

  execute({ description, name }: RequestInterface): void {
    const categoryAlreadyExists = this.categoriesRepository.findByName(name);

    // Validação de categoria por nome
    if (categoryAlreadyExists) {
      // Erro lançado para quem fez a requisição
      throw new Error("Category already existis!");
    }

    this.categoriesRepository.create({ name, description });
  }
}

export { CreateCategoryService };
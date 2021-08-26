import { Router } from "express";

import { CategoriesRepository } from "../repositories/CategoriesRepository";

const categoriesRoutes = Router();
const categoriesRepository = new CategoriesRepository();

/**
 * Cometandos pois a resposabilidade sobre os métodos das categorias passou para o repository
 */
// const categories: Category[] = [];
// import { Category } from "../models/Category";

categoriesRoutes.post("/", (request, response) => {
  const { name, description } = request.body;

  categoriesRepository.create({ name, description });

  return response.status(201).send();

  // Utilizando o construtor da classe Category
  /**
   * Trecho de código movido para o CategoriesRepository para melhorar o encapsulamento de código,
   * reaproveitamento e mais.
   */
  // const category = new Category();
  // Object.assign(category, { name, description });
  // categories.push(category);
});

export { categoriesRoutes };
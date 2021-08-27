import { Router } from "express";

import { CategoriesRepository } from "../repositories/CategoriesRepository";
import { CreateCategoryService } from "../services/CreateCategoryService";

const categoriesRoutes = Router();
const categoriesRepository = new CategoriesRepository();

/**
 * Cometandos pois a resposabilidade sobre os métodos das categorias passou para o repository
 */
// const categories: Category[] = [];
// import { Category } from "../models/Category";

categoriesRoutes.post("/", (request, response) => {
  const { name, description } = request.body;

  // SRP + DPI para criação da categoria
  const createCategoryService = new CreateCategoryService(categoriesRepository);
  createCategoryService.execute({ name, description });

  return response.status(201).send();

  // Validação de categoria por nome
  /**
   * Trecho de código movido para "services/CreateCategoryService.ts"
   */
  // const categoryAlreadyExists = categoriesRepository.findByName(name);
  // if (categoryAlreadyExists) {
  //   return response.status(400).json({ error: "Category already exists!" });
  // }
  // categoriesRepository.create({ name, description });

  // Utilizando o construtor da classe Category
  /**
   * Trecho de código movido para o CategoriesRepository para melhorar o encapsulamento de código,
   * reaproveitamento e mais.
   */
  // const category = new Category();
  // Object.assign(category, { name, description });
  // categories.push(category);
});

categoriesRoutes.get("/", (request, response) => {
  const categories = categoriesRepository.list();

  return response.json(categories);
});

export { categoriesRoutes };

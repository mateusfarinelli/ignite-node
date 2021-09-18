import { response, Router } from "express";
import multer from "multer";

/**
 * Por estarmos trabalhand com export default não iremos mais utilizar o import dessa forma
 * import { createCategoryController } from "../modules/cars/useCases/createCategory";
 * import { importCategoryController } from "../modules/cars/useCases/importCategory";
 * import { listCategoriesController } from "../modules/cars/useCases/listCategories";
 */
import createCategoryController from "../modules/cars/useCases/createCategory";
import importCategoryController from "../modules/cars/useCases/importCategory";
import listCategoriesController from "../modules/cars/useCases/listCategories";
// Não será mais utlizado aqui
// import { CreateCategoryUseCase } from "../modules/cars/useCases/createCategory/CreateCategoryUseCase";
// import { CategoriesRepository } from "../modules/cars/repositories/CategoriesRepository";

const categoriesRoutes = Router();

// Não há necessidade de instanciar o repository pois foram criados controllers e userCases
// const categoriesRepository = new CategoriesRepository();

/**
 * Cometandos pois a resposabilidade sobre os métodos das categorias passou para o repository
 */
// const categories: Category[] = [];
// import { Category } from "../models/Category";

categoriesRoutes.post("/", (request, response) => {
  return createCategoryController().handle(request, response);
  // Código movido para o arquivo CreateCategoryController.ts
  // const { name, description } = request.body;
  // // SRP + DPI para criação da categoria
  // const createCategoryService = new CreateCategoryUseCase(categoriesRepository);
  // createCategoryService.execute({ name, description });
  // return response.status(201).send();
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
  console.log("Teste reload Docker");
  return listCategoriesController().handle(request, response);
  // Movido para o arquivo ListCategoriesController.ts
  // const categories = categoriesRepository.list();
  // return response.json(categories);
});

/**
 * Trabalhando com multer
 *
 * Varivel que recebe configurações iniciais do multer;
 *
 * Caso o arquivo fosse somente para leitura poderiamos deixar somente a variavel recebendo
 * o valor a função;
 *
 * Neste caso iremos salvar temporariamente o arquivo no nosso servidor;
 */
const uploadConfigs = multer({
  dest: "./tmp",
});

/**
 * Rota que fará o upload do arquivo
 *
 * Passamos a variavel que criamos com as configurações inicais do multer como middleware;
 * E também chamamos o método single que será responsavel por receber um unico arquivo nessa
 * requisição;
 */
categoriesRoutes.post(
  "/import",
  uploadConfigs.single("file"),
  (request, response) => {
    /**
     * Trecho de código movido para ImportCategoryController.ts
     */
    // const { file } = request;
    // console.log(file);
    // return response.send();

    return importCategoryController().handle(request, response);
  }
);

export { categoriesRoutes };

import { response, Router } from "express";
import multer from "multer";

/**
 * Por estarmos trabalhand com export default não iremos mais utilizar o import dessa forma
 * import { createCategoryController } from "../modules/cars/useCases/createCategory";
 * import { importCategoryController } from "../modules/cars/useCases/importCategory";
 * import { listCategoriesController } from "../modules/cars/useCases/listCategories";
 */

// Mudando como a DI é feita não precisamos mais desse import e utilziaremos o import
// a seguir
// import createCategoryController from "../modules/cars/useCases/createCategory";
// import listCategoriesController from "../modules/cars/useCases/listCategories";

import { CreateCategoryController } from "../modules/cars/useCases/createCategory/CreateCategoryController";
import { ImportCategoryController } from "../modules/cars/useCases/importCategory/ImportCategoryController";
import { ListCategoriesController } from "../modules/cars/useCases/listCategories/ListCategoriesController";
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

// Com mudança em como fazemos nossa DI iremos utilizar o método posto a seguir
// categoriesRoutes.post("/", (request, response) => {
//   return createCategoryController().handle(request, response);

// Controller atuando como middleware conforme vimos, por conta da DI feita com o Tsyringe
const createCategoryController = new CreateCategoryController();
categoriesRoutes.post("/", createCategoryController.handle);

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
// });

// Método sem utilizar o Tsyringe para DI
// categoriesRoutes.get("/", (request, response) => {
//   console.log("Teste reload Docker");
//   return listCategoriesController().handle(request, response);
//   // Movido para o arquivo ListCategoriesController.ts
//   // const categories = categoriesRepository.list();
//   // return response.json(categories);
// });

// Método utilizando TSyringe para DI
const listCategoriesController = new ListCategoriesController();
categoriesRoutes.get("/", listCategoriesController.handle);

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

// Método antes da utilizando do Tsyringe para DI
// categoriesRoutes.post(
//   "/import",
//   uploadConfigs.single("file"),
//   (request, response) => {
//     /**
//      * Trecho de código movido para ImportCategoryController.ts
//      */
//     // const { file } = request;
//     // console.log(file);
//     // return response.send();

//     return importCategoryController().handle(request, response);
//   }
// );

// Método Utilizando Tsyringe para DI
const importCategoryController = new ImportCategoryController();
categoriesRoutes.post(
  "/import",
  uploadConfigs.single("file"),
  importCategoryController.handle
);

export { categoriesRoutes };

// import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";
// import { CreateCategoryController } from "./CreateCategoryController";
// import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

// /**
//  * Transformamos nosso arquivo em uma função com o export default
//  */

// export default (): CreateCategoryController => {
//   /**
//    * Não iremos utilizar o singleton pattern por enquanto, dessa forma vamos instanciar
//    * o nosso repository manualmente;
//    * const categoriesRepository = CategoriesRepository.getInstance();
//    */
//   const categoriesRepository = new CategoriesRepository();
//   const createCategoryUseCase = new CreateCategoryUseCase(categoriesRepository);
//   const createCategoryController = new CreateCategoryController(
//     createCategoryUseCase
//   );

//   return createCategoryController;
// };

// // export { createCategoryController, createCategoryUseCase };

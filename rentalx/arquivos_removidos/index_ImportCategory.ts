import { CategoriesRepository } from "../src/modules/cars/repositories/implementations/CategoriesRepository";
import { ImportCategoryController } from "../src/modules/cars/useCases/importCategory/ImportCategoryController";
import { ImportCategoryUserCase } from "../src/modules/cars/useCases/importCategory/ImportCategoryUseCase";

/**
 * Transformamos nosso arquivo em uma função com o export default
 */

export default (): ImportCategoryController => {
  // export { createCategoryController, createCategoryUseCase };
  /**
   * Não iremos utilizar o singleton pattern por enquanto, dessa forma vamos instanciar
   * o nosso repository manualmente;
   * const categoriesRepository = CategoriesRepository.getInstance();
   */
  const categoriesRepository = new CategoriesRepository();
  const importCategoryUseCase = new ImportCategoryUserCase(
    categoriesRepository
  );
  const importCategoryController = new ImportCategoryController(
    importCategoryUseCase
  );

  return importCategoryController;
};

// export { importCategoryController };

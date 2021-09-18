import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";
import { ImportCategoryController } from "./ImportCategoryController";
import { ImportCategoryUserCase } from "./ImportCategoryUseCase";

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

import { CategoriesRepository } from "../src/modules/cars/repositories/implementations/CategoriesRepository";
import { ListCategoriesController } from "../src/modules/cars/useCases/listCategories/ListCategoriesController";
import { ListCategoriesUseCase } from "../src/modules/cars/useCases/listCategories/ListCategoriesUseCase";

/**
 * Transformamos nosso arquivo em uma função com o export default
 */

export default (): ListCategoriesController => {
  /**
   * Não iremos utilizar o singleton pattern por enquanto, dessa forma vamos instanciar
   * o nosso repository manualmente;
   * const categoriesRepository = CategoriesRepository.getInstance();
   */
  const categoriesRepository = new CategoriesRepository();
  const listCategoriesUseCase = new ListCategoriesUseCase(categoriesRepository);
  const listCategoriesController = new ListCategoriesController(
    listCategoriesUseCase
  );

  return listCategoriesController;
};

// export { listCategoriesController, listCategoriesUseCase };

import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";
import { ListCategoriesController } from "./ListCategoriesController";
import { ListCategoriesUseCase } from "./ListCategoriesUseCase";

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

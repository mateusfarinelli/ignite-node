import { Category } from "../../entities/Category";
import { CategoriesRepositoryInterface } from "../../repositories/CategoriesRepositoryInterface";

class ListCategoriesUseCase {
  constructor(private categoriesRepository: CategoriesRepositoryInterface) {}

  execute(): Category[] {
    const categories = this.categoriesRepository.list();
    return [];
  }
}

export { ListCategoriesUseCase };

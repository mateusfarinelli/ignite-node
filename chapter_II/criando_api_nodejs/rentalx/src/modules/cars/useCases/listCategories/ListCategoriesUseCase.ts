import { Category } from "../../models/Category";
import { CategoriesRepositoryInterface } from "../../repositories/CategoriesRepositoryInterface";

class ListCategoriesUseCase {
  constructor(private categoriesRepository: CategoriesRepositoryInterface) {}

  execute(): Category[] {
    const categories = this.categoriesRepository.list();
    return categories;
  }
}

export { ListCategoriesUseCase };

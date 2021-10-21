import { inject, injectable } from "tsyringe";

import { Category } from "../../entities/Category";
import { CategoriesRepositoryInterface } from "../../repositories/CategoriesRepositoryInterface";

@injectable()
class ListCategoriesUseCase {
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: CategoriesRepositoryInterface
  ) {}

  async execute(): Promise<Category[]> {
    const categories = await this.categoriesRepository.list();
    return categories;
  }
}

export { ListCategoriesUseCase };

import { Category } from "../../entities/Category";
import {
  CategoriesRepositoryInterface,
  CreatedCtegoryDTOInterface,
} from "../CategoriesRepositoryInterface";

class CategoryRepositoryInMemory implements CategoriesRepositoryInterface {
  categories: Category[] = [];

  async findByName(name: string): Promise<Category> {
    const category = this.categories.find((category) => category.name === name);

    return category;
  }

  async list(): Promise<Category[]> {
    const listCategories = this.categories;

    return listCategories;
  }
  async create({
    name,
    description,
  }: CreatedCtegoryDTOInterface): Promise<void> {
    const category = new Category();

    Object.assign(category, {
      name,
      description,
    });

    this.categories.push(category);
  }
}

export { CategoryRepositoryInMemory };

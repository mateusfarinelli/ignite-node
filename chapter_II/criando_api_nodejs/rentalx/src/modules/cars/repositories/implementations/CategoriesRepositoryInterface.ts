import { Category } from "../../models/Category";

interface CreatedCtegoryDTOInterface {
  name: string;
  description: string;
}

interface CategoriesRepositoryInterface {
  findByName(name: string): Category;
  list(): Category[];
  create({ name, description }: CreatedCtegoryDTOInterface): void;
}

export { CategoriesRepositoryInterface, CreatedCtegoryDTOInterface };

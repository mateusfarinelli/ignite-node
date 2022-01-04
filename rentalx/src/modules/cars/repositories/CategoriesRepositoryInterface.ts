import { Category } from "../infra/typeorm/entities/Category";

interface CreatedCtegoryDTOInterface {
  name: string;
  description: string;
}

interface CategoriesRepositoryInterface {
  findByName(name: string): Promise<Category>;
  list(): Promise<Category[]>;
  create({ name, description }: CreatedCtegoryDTOInterface): Promise<void>;
}

export { CategoriesRepositoryInterface, CreatedCtegoryDTOInterface };

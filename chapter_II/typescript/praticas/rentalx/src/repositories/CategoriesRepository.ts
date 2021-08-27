import { Category } from "../models/Category";

// DTO => Data Transfer Object -> Objeto responsavel por fazer a transferencia de dados entre uma camada e outra

interface CreatedCtegoryDTOInterface {
  name: string;
  description: string;
}

class CategoriesRepository {
  private categories: Category[];

  constructor() {
    this.categories = [];
  }

  create({ name, description }: CreatedCtegoryDTOInterface): void {
    const category = new Category();

    Object.assign(category, { name, description, created_at: new Date() });
    this.categories.push(category);
  }

  list(): Category[] {
    return this.categories;
  }
}

export { CategoriesRepository };

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
    // Chamada do construtor da classe de categoria
    const category = new Category();

    // Inserindo os dados em forma de objeto para dentro do objeto Categoria
    Object.assign(category, { name, description, created_at: new Date() });
    this.categories.push(category);
  }

  list(): Category[] {
    return this.categories;
  }

  findByName(name: string): Category {
    const category = this.categories.find((category) => category.name === name);

    return category;
  }
}

export { CategoriesRepository };

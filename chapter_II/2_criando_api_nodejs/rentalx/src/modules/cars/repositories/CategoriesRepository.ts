import { Category } from "../models/Category";
import {
  CategoriesRepositoryInterface,
  CreatedCtegoryDTOInterface,
} from "./implementations/CategoriesRepositoryInterface";

// DTO => Data Transfer Object -> Objeto responsavel por fazer a transferencia de dados entre uma camada e outra
/**
 * Movido para CategoriesRepositoryInterface para estudarmos o LSP
 */
// interface CreatedCtegoryDTOInterface {
//   name: string;
//   description: string;
// }

/**
 * Implementando a CategoriesRepositoryInterface para estudo do LSP
 */
class CategoriesRepository implements CategoriesRepositoryInterface {
  private categories: Category[];

  // Assumindo padrão Singleton (antes INSTANCE não existia e constructor era public)
  private static INSTANCE: CategoriesRepository;
  private constructor() {
    this.categories = [];
  }

  public static getInstance(): CategoriesRepository {
    if (!CategoriesRepository.INSTANCE) {
      CategoriesRepository.INSTANCE = new CategoriesRepository();
    }
    return CategoriesRepository.INSTANCE;
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

  teste(): string {
    return "Teste";
  }
}

export { CategoriesRepository };

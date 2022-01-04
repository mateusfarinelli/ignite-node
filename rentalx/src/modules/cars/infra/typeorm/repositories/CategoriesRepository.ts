import { getRepository, Repository } from "typeorm";

import {
  CategoriesRepositoryInterface,
  CreatedCtegoryDTOInterface,
} from "../../../repositories/CategoriesRepositoryInterface";
import { Category } from "../entities/Category";

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
  /**
   * Nãp iremos mais utilizar essa variavel pois agora trabalharemos com o banco de dados
   * private categories: Category[];
   */

  private repository: Repository<Category>;

  // Assumindo padrão Singleton (antes INSTANCE não existia e constructor era public)
  private static INSTANCE: CategoriesRepository;

  // O construtor passa a ser publico agora;
  constructor() {
    /**
     * Não iremos inicializar a variavel pois trabalheremos agora com o banco de dados
     * this.categories = [];
     */
    this.repository = getRepository(Category);
  }

  /**
   * Não iremos utilizar neste momento pois não será preciso verificar a implementação do pattern
   * singleton, uma vez que tudo que iremos utilziar virá do banco
   *  public static getInstance(): CategoriesRepository {
    if (!CategoriesRepository.INSTANCE) {
      CategoriesRepository.INSTANCE = new CategoriesRepository();
    }
    return CategoriesRepository.INSTANCE;
  }
   */

  async create({
    name,
    description,
  }: CreatedCtegoryDTOInterface): Promise<void> {
    /**
     * Não iremos mais utilizar pois estaremos trabalhando com banco de dados agora
     * Chamada do construtor da classe de categoria
     * const category = new Category();
     *
     * Inserindo os dados em forma de objeto para dentro do objeto Categoria
     * Object.assign(category, { name, description, created_at: new Date() });
     *
     * this.categories.push(category);
     */

    const category = this.repository.create({
      description,
      name,
    });

    await this.repository.save(category);
  }

  async list(): Promise<Category[]> {
    const categories = await this.repository.find();

    return categories;
  }

  async findByName(name: string): Promise<Category> {
    const category = await this.repository.findOne({
      name,
    });

    return category;
  }
}

export { CategoriesRepository };

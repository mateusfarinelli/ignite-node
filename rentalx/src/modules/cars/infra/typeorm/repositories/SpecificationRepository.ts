import { getRepository, Repository } from "typeorm";

import {
  SpecificationRepositoryDTOInterface,
  SpecificationRepositoryInterface,
} from "../../../repositories/SpecificationRepositoryInterface";
import { Specification } from "../entities/Specification";

class SpecificationRepository implements SpecificationRepositoryInterface {
  private repository: Repository<Specification>;

  // Utilizado quando não tinhamos a migration/entity criada para o typeORM
  // private specifications: Specification[];

  constructor() {
    this.repository = getRepository(Specification);
    // Utilizado quando não tinhamos a migration/entity criada para o typeORM
    // this.specifications = [];
  }

  async create({
    name,
    description,
  }: SpecificationRepositoryDTOInterface): Promise<void> {
    const specification = this.repository.create({
      name,
      description,
    });

    // Utilizado quando não estavamos fazendo persistencia de dados no BD
    // const specification = new Specification();
    // Object.assign(specification, {
    //   name,
    //   description,
    //   created_at: new Date(),
    // });
    // // this.specifications.push(specification);

    await this.repository.save(specification);
  }

  async findByName(name: string): Promise<Specification> {
    const specification = this.repository.findOne({
      name,
    });

    return specification;
  }
}

export { SpecificationRepository };

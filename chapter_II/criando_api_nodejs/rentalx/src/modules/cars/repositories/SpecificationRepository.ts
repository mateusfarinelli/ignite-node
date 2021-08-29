import { Specification } from "../models/Specification";
import {
  SpecificationRepositoryDTOInterface,
  SpecificationRepositoryInterface,
} from "./implementations/SpecificationRepositoryInterface";

class SpecificationRepository implements SpecificationRepositoryInterface {
  private specifications: Specification[];

  constructor() {
    this.specifications = [];
  }

  create({ name, description }: SpecificationRepositoryDTOInterface): void {
    const specification = new Specification();

    Object.assign(specification, {
      name,
      description,
      created_at: new Date(),
    });
    this.specifications.push(specification);
  }

  findByName(name: string): Specification {
    const specification = this.specifications.find(
      (specification) => specification.name === name
    );
    return specification;
  }
}

export { SpecificationRepository };

import { Specification } from "../models/Specification";

interface SpecificationRepositoryDTOInterface {
  name: string;
  description: string;
}

interface SpecificationRepositoryInterface {
  create({ name, description }: SpecificationRepositoryDTOInterface): void;
  findByName(name: string): Specification;
}

export {
  SpecificationRepositoryDTOInterface,
  SpecificationRepositoryInterface,
};

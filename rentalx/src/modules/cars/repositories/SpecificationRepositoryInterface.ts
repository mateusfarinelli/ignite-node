import { Specification } from "../infra/typeorm/entities/Specification";

interface SpecificationRepositoryDTOInterface {
  name: string;
  description: string;
}

interface SpecificationRepositoryInterface {
  create({
    name,
    description,
  }: SpecificationRepositoryDTOInterface): Promise<void>;
  findByName(name: string): Promise<Specification>;
}

export {
  SpecificationRepositoryDTOInterface,
  SpecificationRepositoryInterface,
};

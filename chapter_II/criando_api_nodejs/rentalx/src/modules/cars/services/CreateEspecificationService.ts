import { SpecificationRepositoryInterface } from "../repositories/SpecificationRepositoryInterface";

interface RequestInterface {
  name: string;
  description: string;
}
class CreateSpecificationService {
  constructor(
    private specificationRepository: SpecificationRepositoryInterface
  ) {}

  execute({ name, description }: RequestInterface): void {
    const specificationAlreadyExistis =
      this.specificationRepository.findByName(name);

    if (specificationAlreadyExistis) {
      throw new Error("Specification already existis!");
    }

    this.specificationRepository.create({
      name,
      description,
    });
  }
}

export { CreateSpecificationService };

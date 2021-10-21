import { inject, injectable } from "tsyringe";

import { SpecificationRepositoryInterface } from "../../repositories/SpecificationRepositoryInterface";

interface RequestInterface {
  name: string;
  description: string;
}
@injectable()
class CreateSpecificationUseCase {
  constructor(
    @inject("SpecificationRepository")
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

export { CreateSpecificationUseCase };

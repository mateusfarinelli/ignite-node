import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../shared/errors/AppError";
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

  async execute({ name, description }: RequestInterface): Promise<void> {
    const specificationAlreadyExistis =
      await this.specificationRepository.findByName(name);

    if (specificationAlreadyExistis) {
      throw new AppError("Specification already existis!");
    }

    await this.specificationRepository.create({
      name,
      description,
    });
  }
}

export { CreateSpecificationUseCase };

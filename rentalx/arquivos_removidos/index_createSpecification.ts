import { SpecificationRepository } from "../src/modules/cars/repositories/implementations/SpecificationRepository";
import { CreateSpecificationController } from "../src/modules/cars/useCases/createSpecification/CreateSpecificationController";
import { CreateSpecificationUseCase } from "../src/modules/cars/useCases/createSpecification/CreateSpecificationUseCase";

const specificationRepository = new SpecificationRepository();
const createSpecificationUseCase = new CreateSpecificationUseCase(
  specificationRepository
);
const createSpecificationController = new CreateSpecificationController(
  createSpecificationUseCase
);

export { createSpecificationController };

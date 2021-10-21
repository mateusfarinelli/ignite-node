import { Router } from "express";

import { CreateSpecificationController } from "../modules/cars/useCases/createSpecification/CreateSpecificationController";
// Não serão mais utilizados devido a refatoração de Controllers e UseCases
// import { SpecificationRepository } from "../modules/cars/repositories/SpecificationRepository";
// import { CreateSpecificationService } from "../modules/cars/useCases/createSpecification/CreateSpecificationUseCase";
// const specificationsRepository = new SpecificationRepository();

const specificationsRoutes = Router();

// Método sem utilizando do TSyringe para DI
// specificationsRoutes.post("/", (request, response) => {
//   return createSpecificationController.handle(request, response);
// });

// Método utilizando TSyringe para DI
const createSpecificationController = new CreateSpecificationController();
specificationsRoutes.post("/", createSpecificationController.handle);

// specificationsRoutes.get("/", (request, response) => {
//   const specifications = createSpecificationService.list();

//   return response.json(specifications);
// });
export { specificationsRoutes };

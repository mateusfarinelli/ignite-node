import { Router } from "express";

import { createSpecificationController } from "../modules/cars/useCases/createSpecification";
// Não serão mais utilizados devido a refatoração de Controllers e UseCases
// import { SpecificationRepository } from "../modules/cars/repositories/SpecificationRepository";
// import { CreateSpecificationService } from "../modules/cars/useCases/createSpecification/CreateSpecificationUseCase";
// const specificationsRepository = new SpecificationRepository();

const specificationsRoutes = Router();

specificationsRoutes.post("/", (request, response) => {
  return createSpecificationController.handle(request, response);
});

// specificationsRoutes.get("/", (request, response) => {
//   const specifications = createSpecificationService.list();

//   return response.json(specifications);
// });
export { specificationsRoutes };

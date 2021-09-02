import { ImportCategoryController } from "./ImportCategoryController";
import { ImportCategoryUserCase } from "./ImportCategoryUseCase";

const importCategoryUseCase = new ImportCategoryUserCase();
const importCategoryController = new ImportCategoryController(
  importCategoryUseCase
);

export { importCategoryController };

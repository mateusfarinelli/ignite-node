import { Response, Request } from "express";

import { ImportCategoryUserCase } from "./ImportCategoryUseCase";

class ImportCategoryController {
  constructor(private importCategoryUseCase: ImportCategoryUserCase) {}
  handle(request: Request, response: Response): Response {
    const { file } = request;
    this.importCategoryUseCase.execute(file);

    return response.send();
  }
}
export { ImportCategoryController };

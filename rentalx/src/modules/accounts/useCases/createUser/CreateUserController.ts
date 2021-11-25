import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateUserUserCase } from "./CreateUserUseCase";

class CreateuserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, username, email, drive_license, password } = request.body;
    const createUserUseCase = container.resolve(CreateUserUserCase);

    await createUserUseCase.execute({
      name,
      username,
      email,
      drive_license,
      password,
    });

    return response.status(201).send();
  }
}

export { CreateuserController };

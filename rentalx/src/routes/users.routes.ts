import { Router } from "express";

import { CreateuserController } from "../modules/accounts/useCases/createUser/CreateUserController";

const usersRoutes = Router();

const createUserController = new CreateuserController();

usersRoutes.post("/", createUserController.handle);

export { usersRoutes };

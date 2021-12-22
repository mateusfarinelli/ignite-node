import { Router } from "express";

import { CreateuserController } from "../modules/accounts/useCases/createUser/CreateUserController";
import { UpdaterUserAvatarController } from "../modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController";

const usersRoutes = Router();

const createUserController = new CreateuserController();
const updateUserAvatarController = new UpdaterUserAvatarController();

usersRoutes.post("/", createUserController.handle);

usersRoutes.patch("/avatar", updateUserAvatarController.handle)

export { usersRoutes };

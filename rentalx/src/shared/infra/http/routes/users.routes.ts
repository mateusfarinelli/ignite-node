import { Router } from "express";
import multer from "multer";

import uploadConfig from "../../../../config/upload";
import { CreateuserController } from "../../../../modules/accounts/useCases/createUser/CreateUserController";
import { UpdaterUserAvatarController } from "../../../../modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const usersRoutes = Router();

const uploadAvatar = multer(uploadConfig.upload("./tmp/avatar"));

const createUserController = new CreateuserController();
const updateUserAvatarController = new UpdaterUserAvatarController();

usersRoutes.post("/", createUserController.handle);

usersRoutes.patch(
  "/avatar",
  ensureAuthenticated,
  uploadAvatar.single("avatar"),
  updateUserAvatarController.handle
);

export { usersRoutes };

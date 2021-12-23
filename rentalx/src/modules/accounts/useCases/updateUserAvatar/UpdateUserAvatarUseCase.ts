import { inject, injectable } from "tsyringe";

import { deleteFile } from "../../../../utils/file";
import { UserRepositoryInterface } from "../../repositories/UserRepositoryInterface";

interface RequestInterface {
  user_id: string;
  avatar_file: string;
}

@injectable()
class UpdateUserAvatarUseCase {
  constructor(
    @inject("UserRepository")
    private usersRepository: UserRepositoryInterface
  ) {}

  async execute({ user_id, avatar_file }: RequestInterface): Promise<void> {
    const user = await this.usersRepository.findById(user_id);

    if (user.avatar) {
      await deleteFile(`./tmp/avatar/${user.avatar}`);
    }
    user.avatar = avatar_file;

    await this.usersRepository.create(user);
  }
}

export { UpdateUserAvatarUseCase };

import { inject, injectable } from "tsyringe";

import { CreateUserInterfaceDTO } from "../../dtos/CreateUserInterfaceDTO";
import { UserRepositoryInterface } from "../../repositories/UserRepositoryInterface";

@injectable()
class CreateUserUserCase {
  constructor(
    @inject("UserRepository")
    private userRepository: UserRepositoryInterface
  ) {}

  async execute({
    name,
    username,
    email,
    drive_license,
    password,
  }: CreateUserInterfaceDTO): Promise<void> {
    await this.userRepository.create({
      name,
      username,
      email,
      drive_license,
      password,
    });
  }
}

export { CreateUserUserCase };

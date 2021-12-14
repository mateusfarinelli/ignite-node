import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../../errors/AppError";
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
    email,
    drive_license,
    password,
  }: CreateUserInterfaceDTO): Promise<void> {
    const passwordHash = await hash(password, 8);

    const userAlreadyExists = await this.userRepository.findByEmail(email);

    console.log(email, userAlreadyExists);

    if (userAlreadyExists) {
      throw new AppError("User already exists!");
    }

    await this.userRepository.create({
      name,
      email,
      drive_license,
      password: passwordHash,
    });
  }
}

export { CreateUserUserCase };

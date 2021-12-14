import { getRepository, Repository } from "typeorm";

import { CreateUserInterfaceDTO } from "../../dtos/CreateUserInterfaceDTO";
import { User } from "../../entities/User";
import { UserRepositoryInterface } from "../UserRepositoryInterface";

class UserRepository implements UserRepositoryInterface {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async create({
    name,
    email,
    drive_license,
    password,
  }: CreateUserInterfaceDTO): Promise<void> {
    const user = this.repository.create({
      name,
      email,
      drive_license,
      password,
    });

    await this.repository.save(user);
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOne({ email });

    return user;
  }

  async findById(id: string): Promise<User> {
    const user = await this.repository.findOne({ id });

    return user;
  }
}

export { UserRepository };

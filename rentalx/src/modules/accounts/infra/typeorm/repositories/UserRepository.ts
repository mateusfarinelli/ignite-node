import { getRepository, Repository } from "typeorm";

import { CreateUserInterfaceDTO } from "../../../dtos/CreateUserInterfaceDTO";
import { UserRepositoryInterface } from "../../../repositories/UserRepositoryInterface";
import { User } from "../../entities/User";

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
    id,
    avatar,
  }: CreateUserInterfaceDTO): Promise<void> {
    const user = this.repository.create({
      name,
      email,
      drive_license,
      password,
      id,
      avatar,
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

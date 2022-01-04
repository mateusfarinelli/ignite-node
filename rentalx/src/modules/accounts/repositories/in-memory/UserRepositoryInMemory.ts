import { CreateUserInterfaceDTO } from "../../dtos/CreateUserInterfaceDTO";
import { User } from "../../infra/entities/User";
import { UserRepositoryInterface } from "../UserRepositoryInterface";

class UserRepositoryInMemory implements UserRepositoryInterface {
  users: User[] = [];

  async create({
    drive_license,
    email,
    name,
    password,
  }: CreateUserInterfaceDTO): Promise<void> {
    const user = new User();

    Object.assign(user, {
      drive_license,
      email,
      name,
      password,
    });

    this.users.push(user);
  }

  async findByEmail(email: string): Promise<User> {
    const user = this.users.find((user) => user.email === email);

    return user;
  }

  async findById(id: string): Promise<User> {
    const user = this.users.find((user) => user.id === id);

    return user;
  }
}

export { UserRepositoryInMemory };

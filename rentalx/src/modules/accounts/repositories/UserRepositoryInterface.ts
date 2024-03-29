import { CreateUserInterfaceDTO } from "../dtos/CreateUserInterfaceDTO";
import { User } from "../infra/entities/User";

interface UserRepositoryInterface {
  create(data: CreateUserInterfaceDTO): Promise<void>;
  findByEmail(email: string): Promise<User>;
  findById(id: string): Promise<User>;
}

export { UserRepositoryInterface };

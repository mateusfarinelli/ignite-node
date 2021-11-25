import { CreateUserInterfaceDTO } from "../dtos/CreateUserInterfaceDTO";

interface UserRepositoryInterface {
  create(data: CreateUserInterfaceDTO): Promise<void>;
}

export { UserRepositoryInterface };

import { AppError } from "../../../../shared/errors/AppError";
import { CreateUserInterfaceDTO } from "../../dtos/CreateUserInterfaceDTO";
import { UserRepositoryInMemory } from "../../repositories/in-memory/UserRepositoryInMemory";
import { CreateUserUserCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UserRepositoryInMemory;

// Precisamos criar um novo usuário para validar os testes dessa suite
let createUserUseCase: CreateUserUserCase;

describe("Authenticate User", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UserRepositoryInMemory();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory
    );
    createUserUseCase = new CreateUserUserCase(usersRepositoryInMemory);
  });

  it("shold be possible to authenticate an user", async () => {
    // criando o usuário
    const user: CreateUserInterfaceDTO = {
      drive_license: "12345",
      email: "user@teste.com",
      password: "1234",
      name: "User Test",
    };

    await createUserUseCase.execute(user);

    // autenticando
    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(result).toHaveProperty("token");
  });

  it("should not be able to authenticate a nonexistent user", () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: "false@email.com",
        password: "1234",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to authenticate an user with wrong password", () => {
    expect(async () => {
      const user: CreateUserInterfaceDTO = {
        drive_license: "67890",
        email: "user2@teste.com",
        password: "1234",
        name: "User Test Wrong",
      };
      await createUserUseCase.execute(user);

      await authenticateUserUseCase.execute({
        email: user.email,
        password: "false1234Pass",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});

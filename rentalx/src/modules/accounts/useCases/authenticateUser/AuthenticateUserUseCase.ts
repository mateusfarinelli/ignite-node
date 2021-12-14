import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../../errors/AppError";
import { UserRepositoryInterface } from "../../repositories/UserRepositoryInterface";

interface RequestInterface {
  email: string;
  password: string;
}

interface ResponseInterface {
  user: {
    name: string;
    email: string;
  };
  token: string;
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: UserRepositoryInterface
  ) {}
  async execute({
    email,
    password,
  }: RequestInterface): Promise<ResponseInterface> {
    // Verifica existencia usuário
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError("Email or password incorrect!");
    }

    // Valida senha
    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError("Email or password incorrect!");
    }

    // Gerar JWT
    /**
     * Função sign é uma função sincrona, ou seja, não é uma promise e por isso não
     * requer o await e recebe como parametros: [payload, secretOrPrivateKey, signOptions]
     *
     * Para o secretOrPrivateKey iremos gerar um md5 em um site;
     */
    const token = sign({}, "e4d249a260b1a8cd7e4627d3fb5e95b2", {
      subject: user.id,
      expiresIn: "1d",
    });

    const returnedToken: ResponseInterface = {
      user: {
        name: user.name,
        email: user.email,
      },
      token,
    };

    return returnedToken;
  }
}

export { AuthenticateUserUseCase };

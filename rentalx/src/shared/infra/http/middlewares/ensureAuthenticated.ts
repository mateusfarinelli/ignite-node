import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { AppError } from "../../../errors/AppError";
import { UserRepository } from "../../../../modules/accounts/infra/typeorm/repositories/UserRepository";

interface PayloadInterface {
  sub: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("Token missing", 401);
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub: userId } = verify(
      token,
      "e4d249a260b1a8cd7e4627d3fb5e95b2"
    ) as PayloadInterface;

    const userRepository = new UserRepository();

    const user = await userRepository.findById(userId);

    if (!user) {
      throw new AppError("User doesn't exists!", 401);
    }

    request.user = {
      id: userId,
    };

    next();
  } catch {
    throw new AppError("Invalid token", 401);
  }
}

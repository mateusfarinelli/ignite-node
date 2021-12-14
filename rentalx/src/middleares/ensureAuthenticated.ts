import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { UserRepository } from "../modules/accounts/repositories/implementations/UserRepository";

interface PayloadInterface {
  sub: string;
}

export async function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new Error("Token missing");
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
      throw new Error("User doesn't exists!");
    }

    next();
  } catch {
    throw new Error("Invalid token");
  }
}

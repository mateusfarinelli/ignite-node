import { container } from "tsyringe";

import { UserRepository } from "../../modules/accounts/repositories/implementations/UserRepository";
import { UserRepositoryInterface } from "../../modules/accounts/repositories/UserRepositoryInterface";
import { CategoriesRepositoryInterface } from "../../modules/cars/repositories/CategoriesRepositoryInterface";
import { CategoriesRepository } from "../../modules/cars/repositories/implementations/CategoriesRepository";
import { SpecificationRepository } from "../../modules/cars/repositories/implementations/SpecificationRepository";
import { SpecificationRepositoryInterface } from "../../modules/cars/repositories/SpecificationRepositoryInterface";

/**
 * Passar a interface do repository
 * E nome o nomear o serviço de injeção apra utilziarmos
 */
container.registerSingleton<CategoriesRepositoryInterface>(
  "CategoriesRepository",
  CategoriesRepository
);

container.registerSingleton<SpecificationRepositoryInterface>(
  "SpecificationRepository",
  SpecificationRepository
);

container.registerSingleton<UserRepositoryInterface>(
  "UserRepository",
  UserRepository
);

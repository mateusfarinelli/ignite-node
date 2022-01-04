import { container } from "tsyringe";

import { UserRepository } from "../../modules/accounts/infra/typeorm/repositories/UserRepository";
import { UserRepositoryInterface } from "../../modules/accounts/repositories/UserRepositoryInterface";
import { CategoriesRepository } from "../../modules/cars/infra/typeorm/repositories/CategoriesRepository";
import { SpecificationRepository } from "../../modules/cars/infra/typeorm/repositories/SpecificationRepository";
import { CategoriesRepositoryInterface } from "../../modules/cars/repositories/CategoriesRepositoryInterface";
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

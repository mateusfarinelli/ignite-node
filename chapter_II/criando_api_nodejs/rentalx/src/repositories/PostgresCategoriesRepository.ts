import { Category } from "../models/Category";
import {
  CategoriesRepositoryInterface,
  CreatedCtegoryDTOInterface,
} from "./CategoriesRepositoryInterface";

class PostgresCategoriesRepository implements CategoriesRepositoryInterface {
  findByName(name: string): Category {
    // throw new Error("Method not implemented.");
    console.log(name);
    return null;
  }
  list(): Category[] {
    // throw new Error("Method not implemented.");
    return null;
  }
  create({ name, description }: CreatedCtegoryDTOInterface): void {
    // throw new Error("Method not implemented.");
    console.log(name, description);
    return null;
  }
}

export { PostgresCategoriesRepository };

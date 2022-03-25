import { CreateCarDTOInterface } from "../dto/CreateCarDTOInterface";

interface CarsRepositoryInterface {
  create(data: CreateCarDTOInterface): Promise<void>;
}

export { CarsRepositoryInterface };

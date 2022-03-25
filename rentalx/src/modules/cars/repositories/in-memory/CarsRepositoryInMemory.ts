import { CreateCarDTOInterface } from "../../dto/CreateCarDTOInterface";
import { Car } from "../../infra/typeorm/entities/Car";
import { CarsRepositoryInterface } from "../CarsRepositoryInterface";

class CarsRepositoryInMemory implements CarsRepositoryInterface {
  cars: Car[] = [];
  async create({
    name,
    description,
    daily_rate,
    license_plate,
    fine_amount,
    brand,
    category_id,
  }: CreateCarDTOInterface): Promise<void> {
    const car = new Car();

    Object.assign(car, {
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id,
    });

    this.cars.push(car);
  }
}

export { CarsRepositoryInMemory };

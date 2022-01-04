import { AppError } from "../../../../shared/errors/AppError";
import { CategoryRepositoryInMemory } from "../../repositories/in-memory/CategoriesRepositoryInMemory";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepositoryInMemory: CategoryRepositoryInMemory;

describe("Create category", () => {
  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoryRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(
      categoriesRepositoryInMemory
    );
  });
  it("should be able to create a new category", async () => {
    const category = {
      name: "Category Test",
      description: "Category Description Test",
    };

    await createCategoryUseCase.execute({
      name: category.name,
      description: category.description,
    });

    const categoryCreated = await categoriesRepositoryInMemory.findByName(
      category.name
    );

    expect(categoryCreated).toHaveProperty("id");
  });

  it("should not be possible to create a category with an existing name", async () => {
    expect(async () => {
      const category = {
        name: "Category Test",
        description: "Category Description Test",
      };

      // Chamando create 2x para gerar um erro e podermos verificar
      await createCategoryUseCase.execute({
        name: category.name,
        description: category.description,
      });

      await createCategoryUseCase.execute({
        name: category.name,
        description: category.description,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});

// describe("Criar uma categoria", () => {
//   // Teste de exemplo - 1
//   it("Espero que 2 + 2 seja 4", () => {
//     const soma = 2 + 2;
//     const resultado = 4;

//     expect(soma).toBe(resultado);
//   });
//   // Teste de exemplo - 2
//   it("Espero que 2 + 2 não seja 5", () => {
//     const soma = 2 + 2;
//     const resultado = 5;

//     expect(soma).not.toBe(resultado);
//   });
// });

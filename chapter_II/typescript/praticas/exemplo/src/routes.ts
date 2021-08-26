import { Request, Response } from "express";
import CreateCourseService from "./CreateCourseService";

export function createCourse(request: Request, response: Response) {
  
  // Chamada da função esperando os dados em forma de objeto utilizando interface e desestruturação no construtor no construtor
  CreateCourseService.execute({
    name: "NodeJS",
    // duration: 10,
    educator: "Dani",
  });

  // Chamada da função esperando os dados em forma bruta (sem utilização de interface ou com uma interface mas sem a desestruturação)
  // CreateCourseService.execute("NodeJS", 10, "Dani");

  return response.send();
}
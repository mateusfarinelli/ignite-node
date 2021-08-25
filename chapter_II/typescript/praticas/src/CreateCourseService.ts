/**
 * name - string;
 * duration - number;
 * educator - string;
 */

/**
 * Deixando atributos opcionais dentro da interface com "?"
 * 
 * Dessa forma ao chamar o construtor da função execute no arquivo routes.ts 
 * não precisamos passar aqueles atributos marcados como opcional.
 */
interface Course {
  name: string;
  duration?: number;
  educator?: string;
}

class CreateCourseService {

  // Construtor da função utilizando interface passando uma desestruturação
  // Passando um valor default para o parametro duration, quando não passado o mesmo receberá o valor default
  execute({ name, duration = 10, educator }: Course){
    console.log(name, duration, educator);
  }

  // Construtor da função utilizando interface
  // execute(data: Course){
  //   console.log(data.name, data.duration, data.educator);
  // }

  // Construtor da função sem utilizar interfaces
  // execute(name: string, duration: number, educator: string){
  //   console.log(name, duration, educator);
  // }
}

export default new CreateCourseService;
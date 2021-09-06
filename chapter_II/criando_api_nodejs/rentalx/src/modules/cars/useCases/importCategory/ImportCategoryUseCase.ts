import csvParse from "csv-parse";
import fs from "fs";

import { CategoriesRepositoryInterface } from "../../repositories/implementations/CategoriesRepositoryInterface";

/**
 * Interface criada pois nem todas as informações viram do CSV por isso não podemos usar o model
 * Category ja existante;
 *
 * Além disso para que possamos formatar nosso objeto para ser salvo no banco essa interface
 * ira nos auxiliar;
 */
interface ImportCategoryInterface {
  name: string;
  description: string;
}
class ImportCategoryUserCase {
  constructor(private categoriesRepository: CategoriesRepositoryInterface) {}
  /**
   * Tipo do file foi extraido do Controller, parando o mouse sobre a variavel "file"
   * recebida através da desestruturação do request.
   *
   * Depois de ter passado a função "loadCategories()" como uma promise é preciso
   * fazer com que esse método seja asincrono para que ele aguarde o retorno da chamada
   * da função loadCategories.
   */
  async execute(file: Express.Multer.File): Promise<void> {
    const categories = await this.loadCategories(file);

    /**
     * Salvando a categoria vinda do arquivo no banco.
     */
    categories.map(async (category) => {
      const { name, description } = category;

      const existCategory = this.categoriesRepository.findByName(name);

      if (!existCategory) {
        this.categoriesRepository.create({ name, description });
      }
    });

    /**
     * Código movido para função "loadCategories()" deste arquivo
     */
    // const stream = fs.createReadStream(file.path);
    // /**
    //  * Lendo os dados do CSV
    //  */
    // const parseFile = csvParse();
    // /**
    //  * Pega o que está sendo lido e passa o valor lido para um outro local
    //  * seja uma variavel, função e etc;
    //  *
    //  * Neste caso cada linha lida será passarada para a variavel parseFile
    //  * que por sua vez irá fazer o parse;
    //  */
    // stream.pipe(parseFile);
    // /**
    //  * Aqui fazemos a leitura da linha e printamos cada uma das linhas
    //  */
    // parseFile.on("data", async (line) => {
    //   console.log(line);
    // });
  }

  /**
   * Função criada para carregar um array com as informações recebidas pelo arquivo de maneira já
   * formatada como será esperada pelo nosso banco de dados;
   */
  loadCategories(
    file: Express.Multer.File
  ): Promise<ImportCategoryInterface[]> {
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(file.path);
      const categories: ImportCategoryInterface[] = [];

      const parseFile = csvParse();

      stream.pipe(parseFile);

      /**
       * É preciso fazer com que esse método seja uma promise, se não o console.log(categories) do
       * método executer retornará vazio;
       */
      parseFile
        .on("data", async (line) => {
          const [name, description] = line;
          categories.push({
            name,
            description,
          });
        })
        .on("end", () => {
          /**
           * Removendo o arquivo temporario que é lido para fazer o import das categorias
           * por arquivos CSV.
           */
          fs.promises.unlink(file.path);
          resolve(categories);
        })
        .on("error", (erro) => {
          reject(erro);
        });
    });
  }
}

export { ImportCategoryUserCase };

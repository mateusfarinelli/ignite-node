import csvParse from "csv-parse";
import fs from "fs";

class ImportCategoryUserCase {
  /**
   * Tipo do file foi extraido do Controller, parando o mouse sobre a variavel "file"
   * recebida através da desestruturação do request.
   */
  execute(file: Express.Multer.File): void {
    const stream = fs.createReadStream(file.path);

    /**
     * Lendo os dados do CSV
     */
    const parseFile = csvParse();

    /**
     * Pega o que está sendo lido e passa o valor lido para um outro local
     * seja uma variavel, função e etc;
     *
     * Neste caso cada linha lida será passarada para a variavel parseFile
     * que por sua vez irá fazer o parse;
     */
    stream.pipe(parseFile);

    /**
     * Aqui fazemos a leitura da linha e printamos cada uma das linhas
     */
    parseFile.on("data", async (line) => {
      console.log(line);
    });
  }
}

export { ImportCategoryUserCase };

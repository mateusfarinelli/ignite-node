import { createConnection, getConnectionOptions } from "typeorm";

console.log("Arquivo DB");
interface OptionsInterface {
  host: string;
}

getConnectionOptions().then((options) => {
  const newOptions = options as OptionsInterface;
  newOptions.host = "database"; // Essa opção deverá ser EXATAMENTE o nome dado ao service do banco de dados
  createConnection({
    ...options,
  });
});

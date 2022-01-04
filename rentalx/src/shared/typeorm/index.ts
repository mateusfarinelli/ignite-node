import { createConnection, getConnectionOptions } from "typeorm";

interface OptionsInterface {
  host: string;
}

getConnectionOptions().then((options) => {
  const newOptions = options as OptionsInterface;
  newOptions.host = "database_ignite"; // Essa opção deverá ser EXATAMENTE o nome dado ao service do banco de dados
  createConnection({
    ...options,
  });
});

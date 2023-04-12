const sqlite3 = require("sqlite3");
const sqlite = require("sqlite"); //sqlite está instalado, mas as vezes não a palavra sqlite não é reconhecida, porém ainda contínua funcional
const path = require("path")

async function sqliteConnection(){
  const database = await sqlite.open({
    filename: path.resolve(__dirname, "..", "database.db"), // ou seja diretório onde está(__dirname)/para voltar um caminho-pasta ("..")/ e o nome do arquivo a ser criado (filename)
    driver: sqlite3.Database
  });
  return database;
}

module.exports = sqliteConnection;
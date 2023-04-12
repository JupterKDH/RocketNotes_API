require("express-async-errors");
const migrationsRun = require("./database/sqlite/migrations")
const AppError = require("./utils/AppError")
const express = require("express"); //importando o express pro arquivo

const routes = require("./routes"); //se não especificar qual arquivo quer abrir, ele vai abrir sempre o arquivo index

migrationsRun();

const app = express();
app.use(express.json())

app.use(routes);

/*app.get("/message/:id/:user", (request, response) => {

  const { id, user} = request.params; //parâmetros são obrigatório colocar todas as informações, parâmetros são utilizados para dados simples

  response.send(`
  Mensagem ID: ${id}. 
  Para o usuário: ${user}.
  `);
});*/

/*app.get("/users", (request, response) => {
  const { page, limit } = request.query; // query: informações são opcionais 
  
  response.send(`
  Página: ${page}. 
  Mostrar: ${limit}
  `);
})*/

app.use(( error, request, response, next) => {
  if(error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: "error",
      message: error.message
    });
  }

  console.error(error);

  return response.status(500).json({
    status: "error",
    message: "Internal server error"
  })
});

const PORT = 3333;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
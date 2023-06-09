require("dotenv/config");

require("express-async-errors"); // esta importação precisa ser feita no início de tudo
const migrationsRun = require("./database/sqlite/migrations")
const AppError = require("./utils/AppError")
const express = require("express"); //importando o express pro arquivo
const uploadConfig = require("./configs/upload");

const routes = require("./routes"); //se não especificar qual arquivo quer abrir, ele vai abrir sempre o arquivo index

const cors = require("cors") // para conectar o front com o back-end.
// cors: Cross-origin resource sharing aka(compartilhamento de recursos com origens diferentes).

migrationsRun(); // executando o banco de dados.

const app = express(); // iniciando o express.
app.use(cors()); // habilitando para que o back-end consiga atender as requisições do front-end.
app.use(express.json());
// informando ao node que o conteúdo vindo pelo corpo da requisição é no formato JSON.

app.use("/files", express.static(uploadConfig.UPLOADS_FOLDER));// static para servir arquivos estáticos.

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

// tratar exceções para quando a aplicação der um erro identificar de onde está vindo (cliente ou server)
app.use(( error, request, response, next) => {
  if(error instanceof AppError) { // saber se é um erro gerado pelo lado do cliente.
    return response.status(error.statusCode).json({
      status: "error",
      message: error.message
    });
  }

  console.error(error);

  return response.status(500).json({ // erro padrão (error do servidor).
    status: "error",
    message: "Internal server error"
  })
});

const PORT = process.env.PORT || 3333; // informando a porta que o express deve atender as solicitações.
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`)); // passando a função que será executada quando a aplicação iniciar.

/*
    Ao clicar no Send no Insomnia, vem para o server.js, que está dizendo para a aplicação usar as rotas (app.use(routes))
    que estão no index.js (routes.use("/users", usersRouter)), achando a rota /users, levando para o arquivo usersRouter
    que está no users.routes.js onde estão as rotas do usuário, mostrando que é na raiz que deve aparecer (usersRoutes.post("/", (request, response) => {}))
*/
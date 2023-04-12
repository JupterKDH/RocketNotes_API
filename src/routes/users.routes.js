const { Router } = require("express");

const UsersController = require("../controllers/usersController");

const usersRouter = Router();

function myMiddleware(request, response, next) {
  console.log("Você passou pelo Middleware");
  if(!request.body.isAdmin){
    return response.json({message: "user unauthorized"});
  };

  next();
}

const usersController = new UsersController();

//usersRouter.use(myMiddleware); // para user em todos
usersRouter.post("/", usersController.create);// se for usar o middleware em alguma rota especifica 
usersRouter.put("/:id", usersController.update);

module.exports = usersRouter;
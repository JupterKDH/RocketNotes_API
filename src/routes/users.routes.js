const { Router } = require("express");

const UsersController = require("../controllers/usersController");
const ensureAuthenticated =  require("../middlewares/ensureAuthenticated")

const usersRouter = Router();

const usersController = new UsersController();

//usersRouter.use(myMiddleware); // para user em todos
usersRouter.post("/", usersController.create);// se for usar o middleware em alguma rota especifica 
usersRouter.put("/", ensureAuthenticated, usersController.update);

module.exports = usersRouter;
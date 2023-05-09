const {Router} = require("express");

const SessionsController = require("../controllers/SessionsController");
const sessionsController = new SessionsController();
// instanciando a classe, ou seja alocando a classe na memória e armazenando na constante sessionsController. 

const sessionsRouter = Router();

sessionsRouter.post("/", sessionsController.create)

module.exports = sessionsRouter;
const { Router } = require("express");

const NotesController = require("../controllers/notesController");
const ensureAuthenticated =  require("../middlewares/ensureAuthenticated");

const notesRouter = Router();

const notesController = new NotesController();

notesRouter.use(ensureAuthenticated); // aplicando o middleware para todas as rotas.

notesRouter.get("/", notesController.index);
// não precisa passar o user_id como parâmetro, pois está sendo passado por query.
notesRouter.post("/", notesController.create);
notesRouter.get("/:id", notesController.show);
notesRouter.delete("/:id", notesController.delete);


module.exports = notesRouter;
const { Router } = require("express");

const MoviesController = require("../controllers/moviesController");

const moviesRouter = Router();

const moviesController = new MoviesController();

moviesRouter.get("/", moviesController.index);
moviesRouter.post("/:user_id", moviesController.create);
moviesRouter.get("/:id", moviesController.show);
moviesRouter.delete("/:id", moviesController.delete);


module.exports = moviesRouter;
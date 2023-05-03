const { Router, request } = require("express");
const multer = require("multer");
const uploadConfig = require("../configs/upload")

const UsersController = require("../controllers/usersController");
const UserAvatarController = require("../controllers/UserAvatarController");
const ensureAuthenticated =  require("../middlewares/ensureAuthenticated");

const usersRouter = Router();
const upload = multer(uploadConfig.MULTER);

const usersController = new UsersController();
const userAvatarController = new UserAvatarController();

//usersRouter.use(myMiddleware); // para user em todos
usersRouter.post("/", usersController.create);// se for usar o middleware em alguma rota especifica 
usersRouter.put("/", ensureAuthenticated, usersController.update);
usersRouter.patch("/avatar", ensureAuthenticated, upload.single("avatar"), userAvatarController.update);

module.exports = usersRouter;
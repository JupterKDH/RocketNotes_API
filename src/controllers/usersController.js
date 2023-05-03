const { hash, compare } = require("bcryptjs")

const AppError = require("../utils/AppError");

const sqliteConnection = require("../database/sqlite");

class UsersController {
  /*
  * index - GET para listar vários registros.
  * show - GET para exibir um registro especifico.
  * create - POST para criar um registro.
  * update - PUT para atualizar um registro.
  * delete - DELETE para remover um registro.
  */
  async create(request, response) {
    const { name, email, password } = request.body;

    const database = await sqliteConnection();
    const checkUserExist = await database.get("SELECT * FROM users WHERE email = (?)", [email])

    if(checkUserExist){
      throw new AppError("Este email já está cadastrado.");
    }

    const hashedPassword = await hash(password, 8);

    await database.run(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)", 
      [ name, email, hashedPassword ]
      );

    return response.status(201).json();

   /* if(!name){
      throw new AppError("O campo nome é obrigatório.")
    }*/

   /* response.send(`
    Usuário: ${name}. E-mail ${email}. E a senha é: ${password}
    `);*/
    //response.status(201).json({name, email, password})// para mandar em formato json
  }

  async update(request, response) {
    const {name, email, password, old_password} = request.body;
    const user_id = request.user.id;

    const database = await sqliteConnection();
    const user = await database.get("SELECT * FROM users WHERE id = (?)", [user_id]);

    if(!user) {
      throw new AppError("Não existe esse usuário.");
    }

    const userWithUpdatedEmail = await database.get("SELECT * FROM users WHERE email = (?)", [email]);

    if(userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
      throw new AppError("Este e-mail já está em uso.")
    }

    user.name = name ?? user.name;
    user.email = email ?? user.email;

    if(password && !old_password) {
      throw new AppError("A senha antiga é obrigatória para definir uma nova senha");
    }

    if(password && old_password) {
      const checkOldPassword = await compare(old_password, user.password)

      if(!checkOldPassword) {
        throw new AppError("A senha antiga é inválida.");
      }

      user.password = await hash(password, 8)
    }

    await database.run(`
      UPDATE users SET 
      name = ?,
      email = ?,
      password = ?,
      updated_at = DATETIME('now', 'localtime')
      WHERE id = ?`,
      [user.name, user.email, user.password, user_id]
    );

    return response.json();
  }
}
module.exports = UsersController;

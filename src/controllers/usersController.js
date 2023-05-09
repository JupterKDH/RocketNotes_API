const { hash, compare } = require("bcryptjs") // hash é a função que vai gerar a criptografia da senha.

const AppError = require("../utils/AppError");

const sqliteConnection = require("../database/sqlite"); // importando a conexão com o banco de dados.


/*
  Controllers

  Quando uma requisição chega no arqui server.js, que é o ponto de entrada da aplicação, passa pelas rotas para que seja identificado qual controller dese ser executado. Após executar a requisição, o controller devolve para a rota, que devolve para o usuário que fez a solicitação através do server.js
*/
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
      // verifica se o email está um uso.
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
    // não é mais necessário pegar o id do usuário pelo parâmetro, pois agora ele está incorporado nas requisições

    const database = await sqliteConnection();
    const user = await database.get("SELECT * FROM users WHERE id = (?)", [user_id]);

    if(!user) {
      throw new AppError("Não existe esse usuário.");
    }

    const userWithUpdatedEmail = await database.get("SELECT * FROM users WHERE email = (?)", [email]);

    if(userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
      // checando se o usuário está tentando mudar o email para o email existente de outro usuário.
      throw new AppError("Este e-mail já está em uso.")
    }

    user.name = name ?? user.name; // se existir conteúdo dentro de name, utilize, se não, use o user.name(nome existente no banco de dados).
    user.email = email ?? user.email; // ?? é o nullish coalescing operator aka(operador de coalescência nula -  é um operador lógico que retorna o seu operando do lado direito quando o seu operador do lado esquerdo é null ou undefined. Caso contrário, ele retorna o seu operando do lado esquerdo.)

    if(password && !old_password) {
      throw new AppError("A senha antiga é obrigatória para definir uma nova senha");
    }

    if(password && old_password) {
      // se o password(senha nova) e o old_password forem informados, será verificado se a senha antiga é igual à senha cadastrada no banco de dados.
      const checkOldPassword = await compare(old_password, user.password)
      // necessário usar o compare, pois o old_password está criptografado e o password não está.

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
    ); // atualiza na tabela de usuários e define os valores indicados.

    return response.json();
  }
}
module.exports = UsersController;

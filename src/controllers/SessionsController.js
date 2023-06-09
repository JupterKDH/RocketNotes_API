const knex = require("../database/knex");
const AppError = require("../utils/AppError");
const {compare} = require("bcryptjs")
const authConfig = require("../configs/auth")
const {sign} = require("jsonwebtoken")

class SessionsController{
  async create(request, response){ // criando a sessão para o usuário.
    const { email, password } = request.body;

    const user = await knex("users").where({email}).first();
    // filtra o usuário pelo email, .first() para garantir que retorne um usuário.

    if(!user) { // validando usuário cadastrado.
      throw new AppError("E-mail e/ou senha incorreta", 401);
    }

    const passwordMatched = await compare(password, user.password);

    if(!passwordMatched) { // validando a senha.
      throw new AppError("E-mail e/ou senha incorreta", 401);
    }

    const {secret, expiresIn} = authConfig.jwt;
    const token = sign({}, secret, { // gerando o token do usuário
      subject: String(user.id),  // conteúdo que deseja inserir dentro do token
      expiresIn
    });

    return response.json({user, token});
  }
}

module.exports = SessionsController;
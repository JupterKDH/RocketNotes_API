// Middleware serve para interceptar as requisições, pegar o token, dentro do token pegar o id do usuário para identificar o usuário que está fazendo a requisição.

const {verify} = require('jsonwebtoken');
const AppError = require('../utils/AppError');
const authConfig = require("../configs/auth");

function ensureAuthenticated(request, response, next){
  const authHeader = request.headers.authorization; // pegando o token do usuário

  if(!authHeader){ // verificando se o token não existe.
    throw new AppError("JWT Token não informado", 401);
  }

  const [, token] = authHeader.split(" ");
  // "Bare xxxxxxxxx", const ["Bare",xxxxxxxxx]
  // split("") pega a string e separa passando ela para um vetor( no caso " " espaço).
  // quebrando o texto num array, pegando a segunda posição do array e passando para a variável token.

  try{
    const {sub: user_id} = verify(token, authConfig.jwt.secret);// verifica se o token é valido.
    // sub é o conteúdo armazenado no token, que está sendo convertido em user_id.
    // sub é uma propriedade desestruturada do resultado da função, que vai verificar se o token é valido, se sim vai devolver o sub.

    request.user = {
      id: Number(user_id),
    };
    // inserindo dentro da requisição o user, que contém a propriedade do usuário.
    // no momento que o usuário faz uma requisição para uma determinada rota, o middleware pega o id do usuário e insere o usuário na requisição.

    return next();
  }catch {
    throw new AppError("JWT Token inválido", 401);
  }
}

module.exports = ensureAuthenticated;
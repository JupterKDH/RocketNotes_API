// Configurações para a autenticação do app.

module.exports = {
  jwt: {
    secret:"default", // usado para gerar o token de usuário.

    expiresIn: "1d" // tempo para expiração do token
  }
}
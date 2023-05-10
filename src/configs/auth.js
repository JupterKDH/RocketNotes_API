// Configurações para a autenticação do app.

module.exports = {
  jwt: {
    secret:process.env.AUTH_SECRET || "default", // usado para gerar o token de usuário.
    // se a variável não for encontrada, será utilizada o default.

    expiresIn: "1d" // tempo para expiração do token
  }
}
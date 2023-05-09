const path = require("path")
const multer = require("multer") //biblioteca usada para fazer o upload.
const crypto = require("crypto")

const TMP_FOLDER = path.resolve(__dirname, "..", "..", "tmp"); //para que a imagem fica primeiro.
// __dirname (pasta atual), ".." (volta para a pasta anterior), ".."(novamente pasta anterior) e "tmp" (entrar na pasta tmp na raiz do projeto). 
const UPLOADS_FOLDER = path.resolve(TMP_FOLDER, "uploads"); //pasta definitiva, onde as imagens irão ficar.

const MULTER = {
  // aqui vao receber duas props, que será mandado o arquivo quando for carregado no app, e o nome do arquivo
  storage: multer.diskStorage({
    destination: TMP_FOLDER, // aqui vai ficar a imagem temporariamente quando for carregada no app.
    filename(request, file, callback) {
      const fileHash = crypto.randomBytes(10).toString("hex");
      // utilizar o crypto para gerar um hash aleatório de 10 caracteres no formato hexadecimal.
      const fileName = `${fileHash}-${(file.originalname)}`;
      // essa parte vai criar um nome utilizando o hash aleatório para que nenhum arquivo(imagem) tenha nome igual.

      return callback(null, fileName);
    },
  }),
};

module.exports = {
  TMP_FOLDER,
  UPLOADS_FOLDER,
  MULTER,
}
const { hash } = require("bcryptjs") // hash é a função que vai gerar a criptografia da senha.
const AppError = require("../utils/AppError");

class UserCreateService{
  constructor(userRepository){
    this.userRepository = userRepository;
  }

  async execute ({name, email, password}){
    const checkUserExist = await this.userRepository.findByEmail(email);
   
    if(checkUserExist){
      throw new AppError("Este email já está cadastrado.");
    }

    const hashedPassword = await hash(password, 8);
    
    const userCreated = await this.userRepository.create({name, email, password: hashedPassword});

    return userCreated;
  }
}

module.exports = UserCreateService;
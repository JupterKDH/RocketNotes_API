const knex = require("../database/knex");

class TagsController{ // lista todas as tags cadastradas do usuário.
  async index(request, response) {
    const user_id = request.user.id;

    const tags = await knex("tags")
    .where({ user_id })
    // como o nome é exatamente o mesmo no banco de dados, não é necessário colocar o user_id: user_id.
    .groupBy("name") // agrupa pelo campo para não trazer repetidos desse campo.

    return response.json(tags);
  }
}

module.exports = TagsController;
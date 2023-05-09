
const knex = require("../database/knex");

class NotesController{
  async create(request, response){
    const { title, description, tags, links } = request.body;

    const user_id  = request.user.id;

    const [ note_id ] = await knex("notes").insert({
      title,
      description,
      user_id
    }); // Nessa parte vai cadastrar a nota e recuperar o id da nota cadastrada.

    const linksInsert = links.map(link => {
      return {
        note_id,
        url: link
      }
    }); //  Nessa parte fará o mapeamento dos links, e para cada link será criado um objeto contendo o código da nota no qual o link está vinculado e mudando o link para uma URL.

    await knex("links").insert(linksInsert);

    const tagsInsert = tags.map(name => {
      return {
        note_id,
        name,
        user_id
      }
    });

    await knex("tags").insert(tagsInsert);

    response.json();
  }

  async show(request, response) {
    const {id} = request.params;

    const note = await knex("notes").where({ id}).first();
    // where({id}) serve para selecionar a nota usando o id como parâmetro.
    // first() para sempre retornar uma nota específica.
    const tags = await knex("tags").where({note_id: id}).orderBy("name");
    // orderBy("name") serve para organizar por ondem alfabética.
    const links = await knex("links").where({note_id: id}).orderBy("created_at");
    // orderBy("created_at") serve para organizar pela ordem que o link foi criado.

    return response.json({
      ...note, // aqui vai estar despejando todos os detalhes da nota.
      tags,
      links
    });
  }

  async delete(request, response) {
    const {id} = request.params;

    await knex("notes").where({id}).delete();

    return response.json();
  }

  async index(request, response) { // vai listar as notas cadastradas no banco de dados, incluindo as tags e links.
    const {title, tags} = request.query;

    const user_id = request.user.id;

    let notes;

    if(tags){
      //  aqui se existir tags, fará um filtro baseado nas tags, caso contrário, fará uma consulta normal.
      const filterTags = tags.split(',').map(tag => tag.trim());
      // envia as tags em lista e converte o texto simples para vetor.
      // converte o texto em array usando como delimitador a vírgula.
      // map porque só interessa a tag.
    
      notes = await knex("tags")
        //  vai conectar tabelas tags e notes
        .select([
          "notes.id",
          "notes.title",
          "notes.user_id",
        ]) // campos que deseja selecionar de ambas as tabelas.
        .where("notes.user_id", user_id) // filtrar as tags pelo id do usuário
        .whereLike("notes.title", `%${title}%`)
        .whereIn("name", filterTags)
        // analisa baseando-se na tag.
        // recebe como parâmetros o nome da tag e o vetor que deseja que compare se a tag existe ali ou não.
        .innerJoin("notes", "notes.id", "tags.note_id")
        // conecta uma tabela com outra.
        // tabela que deseja conectar, campos usados para conectar as tabelas, campo em comum entre as tabelas.
        .groupBy("notes.id") // para não repetir as notas.
        .orderBy("notes.title")

    } else {
      notes = await knex("notes")
        .where({ user_id})
        .whereLike("title", `%${title}%`)
        // operador like, serve para buscar valores que contenham partes de uma palavra (serve para usar em um buscador).
        // o primeiro parâmetro é o campo utilizado para fazer a consulta.
        // O porcentual envolvendo o conteúdo da variável pesquisada para pesquisar em qualquer parte da palavra.
        .orderBy("title");
        // filtro para mostrar primeiro somente as notas criadas pelo usuário.
        // organiza por ordem alfabética.
    }

    const userTags = await knex("tags").where({user_id});
    // filtrando as tags onde o id é igual ao id do usuário.
    const notesWithTags = notes.map (note => { // percorrer todas a notas.
      const noteTags = userTags.filter(tag => tag.note_id === note.id);
      // filtra as tags da nota para saber se o id da nota é igual ao note.id das tags vinculadas.

      return{
        ...note,
        tags: noteTags
      }
    });

    return response.json(notesWithTags)
  }

}

module.exports = NotesController;
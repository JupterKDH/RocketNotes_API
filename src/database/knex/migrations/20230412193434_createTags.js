
exports.up =  knex => knex.schema.createTable("tags", table => {
  table.increments("id");
  table.text("name").notNullable(); // não permite que o campo seja nulo.
  
  table.integer("note_id").references("id").inTable("notes").onDelete("CASCADE");
  // as tags serão utilizadas para fazer filtro nas notas.
  // onDelete("CASCADE"): se deletar a nota, todas as tags vinculadas a mesma serão deletadas juntas.
  table.integer("user_id").references("id").inTable("users");


});


exports.down = knex => knex.schema.dropTable("tags");
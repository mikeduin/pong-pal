
exports.up = function(knex, Promise) {
  return knex.schema.createTable('leagues', function(table){
    table.increments();
    table.string('name');
    table.string('city');
    table.string('state');
    table.string('commissioner');
    table.date('created');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('leagues');
};

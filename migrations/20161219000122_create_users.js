
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(table){
    table.increments();
    table.string('username');
    table.string('email').unique();
    table.string('first_name');
    table.string('last_name');
    table.string('hometown');
    table.string('fb_profile');
    table.string('facebookId').unique();
    table.boolean('superuser');
    table.string('photo');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};

const cleaner = require("knex-cleaner");
//for when I have to restart the server over and over because I didn't have time to add middleware to ensure data integrity
exports.seed = function (knex) {
  return cleaner.clean(knex, {
    mode: "truncate",
    ignoreTables: ["knex_migrations", "knex_migrations_lock"],
  });
};

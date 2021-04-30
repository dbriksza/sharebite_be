exports.up = function (knex) {
  return knex.schema
    .createTable("section", (tbl) => {
      tbl.increments("id").primary();
      tbl.string("name").unique().notNullable();
      tbl.string("description").notNullable();
    })
    .createTable("item", (tbl) => {
      tbl.increments("id").primary();
      tbl.string("name").unique().notNullable();
      tbl.string("description").notNullable();
      tbl.decimal("price", 2, 2).notNullable();
      tbl.integer("section_id").references("section.id");
    })
    .createTable("modifier", (tbl) => {
      tbl.increments("id").primary();
      tbl.string("description").unique().notNullable();
    })
    .createTable("item_modifier", (tbl) => {
      tbl.increments("id").primary();
      tbl.integer("item_id").references("item.id");
      tbl.integer("modifier_id").references("modifier.id");
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("item_modifier")
    .dropTableIfExists("modifier")
    .dropTableIfExists("item")
    .dropTableIfExists("section");
};

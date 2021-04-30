const db = require("../data/db-config");
const { Model } = require("objection");
Model.knex(db);

// I find classes (especially interdependent classes) hard to read but this framework likes them

class section extends Model {
  static get tableName() {
    return "section";
  }
  //establishes 1 to many relationship
  static get relationMappings() {
    return {
      item: {
        relation: Model.HasManyRelation,
        modelClass: item,
        join: {
          from: "section.id",
          to: "item.section_id",
        },
      },
    };
  }
}
class item extends Model {
  static get tableName() {
    return "item";
  }
  // closes 1 to many relationship
  static get relationMappings() {
    return {
      section: {
        relation: Model.BelongsToOneRelation,
        modelClass: section,
        join: {
          from: "item.section_id",
          to: "section.id",
        },
      },
      modifier: {
        relation: Model.ManyToManyRelation,
        modelClass: modifier,
        join: {
          from: "item.id",
          //does black magic to add to an existing, but only implicitly defined table
          through: {
            from: "item_modifier.item_id",
            to: "item_modifier.modifier_id",
          },
          to: "modifier.id",
        },
      },
    };
  }
}
class modifier extends Model {
  static get tableName() {
    return "modifier";
  }

  static get relationMappings() {
    return {
      item: {
        relation: Model.ManyToManyRelation,
        modelClass: item,
        join: {
          from: "modifier.id",
          //also working off the implicitly defined table
          through: {
            from: "item_modifier.modifier_id",
            to: "item_modifier.item_id",
          },
          to: "item.id",
        },
      },
    };
  }
}

module.exports = {
  section,
  item,
  modifier,
};

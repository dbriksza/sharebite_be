const db = require("../data/db-config");
const { Model } = require("objection");
Model.knex(db);

class section extends Model {
  static get tableName() {
    return "section";
  }

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

exports.seed = function (knex) {
  return knex("item_modifier").insert([
    { item_id: 1, modifier_id: 1 },
    { item_id: 2, modifier_id: 2 },
    { item_id: 3, modifier_id: 3 },
    { item_id: 1, modifier_id: 2 },
    { item_id: 2, modifier_id: 3 },
    { item_id: 3, modifier_id: 1 },
    { item_id: 1, modifier_id: 3 },
    { item_id: 4, modifier_id: 2 },
    { item_id: 5, modifier_id: 3 },
    { item_id: 6, modifier_id: 2 },
    { item_id: 2, modifier_id: 1 },
    { item_id: 3, modifier_id: 2 },
  ]);
};

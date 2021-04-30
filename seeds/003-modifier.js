exports.seed = function (knex) {
  return knex("modifier").insert([
    {
      description: "Extra Spicy",
    },
    {
      description: "Regular Spice",
    },
    {
      description: "No Spice",
    },
  ]);
};

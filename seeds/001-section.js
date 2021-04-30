exports.seed = function (knex) {
  return knex("section").insert([
    {
      name: "lunch_special",
      description: "Daily Lunch Specials",
    },
    {
      name: "dinner_special",
      description: "Daily Dinner Specials",
    },
  ]);
};

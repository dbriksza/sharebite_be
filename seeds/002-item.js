exports.seed = function (knex) {
  return knex("item").insert([
    {
      name: "Sandwich Lunch",
      description: "MMmm bread",
      price: 10.29,
      section_id: 1,
    },
    {
      name: "Sandwich Dinner",
      description: "MMmm bread",
      price: 15.29,
      section_id: 2,
    },
    {
      name: "Soup Lunch",
      description: "MMmm water",
      price: 5.49,
      section_id: 1,
    },
    {
      name: "Soup Dinner",
      description: "MMmm water",
      price: 10.49,
      section_id: 2,
    },
    {
      name: "Half and Half Lunch",
      description: "MMmm water",
      price: 15.49,
      section_id: 1,
    },
    {
      name: "Half and Half Dinner",
      description: "MMmm water",
      price: 18.49,
      section_id: 2,
    },
  ]);
};

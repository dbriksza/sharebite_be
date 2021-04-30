const express = require("express");
//if I had more time I would have added a try catch to everything, and if I had even more time I would have made a proper middleware
//and maybe extrapolated this into different files
const { section, item, modifier } = require("./model/menu-model");

const server = express();

server.use(express.json());
//gets the whole menu formatted as per the prompt
server.get("/menu", async (req, res) => {
  const sec = await section.query().withGraphFetched("item.[modifier]");
  res.json(sec);
});
//gets all sections
server.get("/sections", async (req, res) => {
  const sec = await section.query();
  res.json(sec);
});
//add a new section
server.post("/addSection", async (req, res) => {
  const sec = await section
    .query()
    .insert({ name: req.body.name, description: req.body.description });
  res.json(sec);
});
//change a currently existing section
server.put("/editSection/:id", async (req, res) => {
  const sec = await section
    .query()
    .update({ name: req.body.name, description: req.body.description })
    .where("id", "=", req.params.id);
  res.json(sec);
});
//delete a section, if I had more time I would add more handling for events where a section that has items in it is deleted
//as it stands the dish will return with the id of the section that no longer exists
server.delete("/removeSection/:id", async (req, res) => {
  const sec = await section.query().deleteById(req.params.id);
  res.json(sec);
});
//gets items
server.get("/items", async (req, res) => {
  const itm = await item.query().withGraphFetched("[modifier]");
  res.json(itm);
});
//add an item
//adding possible modifiers is done on a seperate endpoint
server.post("/addItem", async (req, res) => {
  const itm = await item.query().insert({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    section_id: req.body.section_id,
  });
  res.json(itm);
});
//edit an already existing item
server.put("/editItem/:id", async (req, res) => {
  const itm = await item
    .query()
    .update({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
    })
    .where("id", "=", req.params.id);
  res.json(itm);
});
//delete an item
server.delete("/removeItem/:id", async (req, res) => {
  const itm = await item.query().deleteById(req.params.id);
  res.json(itm);
});
//get all modifiers
server.get("/modifiers", async (req, res) => {
  const mod = await modifier.query();
  res.json(mod);
});
//add a modifier
server.post("/addModifier", async (req, res) => {
  const mod = await modifier.query().insert({
    description: req.body.description,
  });
  res.json(mod);
});
//edit a modifier
server.put("/editModifier/:id", async (req, res) => {
  const mod = await modifier
    .query()
    .update({
      description: req.body.description,
    })
    .where("id", "=", req.params.id);
  res.json(mod);
});
//delete a modifier
// no handling for when an item has a deleted modifier
server.delete("/removeModifier/:id", async (req, res) => {
  const mod = await modifier.query().deleteById(req.params.id);
  res.json(mod);
});
//seperate endpoint for adding existing modifiers to existing items
server.post("/itemmodifier", async (req, res) => {
  const itmmod = await item
    .relatedQuery("modifier")
    .for(req.body.item_id)
    .relate(req.body.modifier_id);
  res.json(itmmod);
});

module.exports = server;

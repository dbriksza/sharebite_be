const express = require("express");

const { section, item, modifier } = require("./model/menu-model");

const server = express();

server.use(express.json());

server.get("/menu", async (req, res) => {
  const sec = await section.query().withGraphFetched("item.[modifier]");
  res.json(sec);
});

server.get("/sections", async (req, res) => {
  const sec = await section.query();
  res.json(sec);
});

server.post("/addSection", async (req, res) => {
  const sec = await section
    .query()
    .insert({ name: req.body.name, description: req.body.description });
  res.json(sec);
});

server.put("/editSection/:id", async (req, res) => {
  const sec = await section
    .query()
    .update({ name: req.body.name, description: req.body.description })
    .where("id", "=", req.params.id);
  res.json(sec);
});

server.delete("/removeSection/:id", async (req, res) => {
  const sec = await section.query().deleteById(req.params.id);
  res.json(sec);
});

server.get("/items", async (req, res) => {
  const itm = await item.query().withGraphFetched("[modifier]");
  res.json(itm);
});

server.post("/addItem", async (req, res) => {
  const itm = await item.query().insert({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
  });
  res.json(itm);
});

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

server.delete("/removeItem/:id", async (req, res) => {
  const itm = await item.query().deleteById(req.params.id);
  res.json(itm);
});

server.get("/modifiers", async (req, res) => {
  const mod = await modifier.query();
  res.json(mod);
});

server.post("/addModifier", async (req, res) => {
  const mod = await modifier.query().insert({
    description: req.body.description,
  });
  res.json(mod);
});

server.put("/editModifier/:id", async (req, res) => {
  const mod = await modifier
    .query()
    .update({
      description: req.body.description,
    })
    .where("id", "=", req.params.id);
  res.json(mod);
});

server.delete("/removeModifier/:id", async (req, res) => {
  const mod = await modifier.query().deleteById(req.params.id);
  res.json(mod);
});

server.post("/itemmodifier", async (req, res) => {
  const itmmod = await item
    .relatedQuery("modifier")
    .for(req.body.item_id)
    .relate(req.body.modifier_id);
  res.json(itmmod);
});

module.exports = server;

const fs = require("fs");
const Recipe = require("../models/recipes_model.js");
const asyncForEach = require("../helpers/asyncForEach");
const cliProgress = require("cli-progress");

async function getAll({ page = 1, limit = 15, name = null }) {
  const aggregation = name ? Recipe.aggregate([{ $match: { name: new RegExp(name, "i") } }]) : {};
  const results = await Recipe.aggregatePaginate(aggregation, {
    page,
    limit,
  });
  const { docs, ...meta } = results;
  return { data: docs, meta };
}

async function getById(id) {
  return await Recipe.findById(id);
}

async function create({ params }) {
  if (await Recipe.findOne({ name: params.name })) {
    throw `Recipe "${params.name}" exists`;
  }
  const recipe = new Recipe(params);
  await recipe.save();
  return recipe;
}

async function update(id, params) {
  const recipe = await Recipe.findById(id);

  if (!recipe) throw "Gear oil not found";

  Object.assign(recipe, params);

  await recipe.save();
  return recipe;
}

async function _delete(id) {
  const recipe = await Recipe.findById(id);
  if (!recipe) throw "Recipe not found";
  await Recipe.findByIdAndRemove(id);
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  delete: _delete,
};

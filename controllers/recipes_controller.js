const express = require("express");
const recipe_service = require("../services/recipe");

const getRecipes = async (req, res, next) => {
  recipe_service
    .getAll(req.query)
    .then(gear_oils => res.json(gear_oils))
    .catch(err => next(err));
};

const getRecipe = async (req, res, next) => {
  recipe_service
    .getById(req.params.id)
    .then(gear_oil => (gear_oil ? res.json(gear_oil) : res.sendStatus(404)))
    .catch(err => next(err));
};

const addRecipe = async (req, res, next) => {
  recipe_service
    .create(req.body)
    .then(data => res.json(data))
    .catch(err => next(err));
};

const updateRecipe = async (req, res, next) => {
  recipe_service
    .update(req.params.id, req.body)
    .then(gear_oil => res.json(gear_oil))
    .catch(err => next(err));
};

const deleteRecipe = async (req, res, next) => {
  recipe_service
    .delete(req.params.id)
    .then(() => res.json({}))
    .catch(err => next(err));
};

const createDefaultRecipes = async (req, res, next) => {
  recipe_service
    .RecipesFromLocalJsonData()
    .then(data => res.json(data))
    .catch(err => next(err));
};

const router = express.Router();
router.get("/", getRecipes);
router.get("/:id", getRecipe);
router.post("/create", addRecipe);
router.put("/:id", updateRecipe);
router.delete("/:id", deleteRecipe);

module.exports = router;

const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("../config.json");
const user_service = require("../services/user");

const authenticate = (req, res, next) => {
  user_service
    .authenticate(req.body)
    .then(user => (user ? res.json(user) : res.status(400).json({ message: "Username or password is incorrect" })))
    .catch(err => next(err));
};

const register = (req, res, next) => {
  user_service
    .create(req.body)
    .then(data => res.json(data))
    .catch(err => next(err));
};

const getCurrent = (req, res, next) => {
  user_service
    .getById(req.user.sub)
    .then(user => (user ? res.json(user) : res.sendStatus(404)))
    .catch(err => next(err));
};

const getById = (req, res, next) => {
  user_service
    .getById(req.params.id)
    .then(user => (user ? res.json(user) : res.sendStatus(404)))
    .catch(err => next(err));
};

const update = (req, res, next) => {
  user_service
    .update(req.params.id, req.body)
    .then(user => res.json(user))
    .catch(err => next(err));
};

const _delete = (req, res, next) => {
  user_service
    .delete(req.params.id)
    .then(() => res.json({}))
    .catch(err => next(err));
};

const router = express.Router();

router.post("/auth", authenticate);
router.post("/register", register);
router.get("/current", getCurrent);
router.get("/:id", getById);
router.put("/:id", update);
router.delete("/:id", _delete);

module.exports = router;

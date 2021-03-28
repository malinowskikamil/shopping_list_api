const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("../config.json");
const User = require("../models/users_model");

async function authenticate({ email, password }) {
  console.log(email)
  const user = await User.findOne({ email });
  if (user && bcrypt.compareSync(password, user.hash)) {
    const token = jwt.sign({ sub: user._id }, config.secret, { expiresIn: "7d" });
    return {
      ...user.toJSON(),
      token,
    };
  }
}

async function getById(id) {
  return await User.findById(id);
}

async function create(params) {

console.log(params)  // validate
  if (await User.findOne({ email: params.email })) {
    throw 'email "' + params.email + '" is already taken';
  }

  const user = new User(params);

  // hash password
  if (params.password) {
    user.hash = bcrypt.hashSync(params.password, 10);
  }

  // save user
  await user.save();
  return user;
}

async function update(id, params) {
  const user = await User.findById(id);

  // validate
  if (!user) throw "User not found";
  if (user.email !== params.email && (await User.findOne({ email: params.email }))) {
    throw 'email "' + params.email + '" is already taken';
  }

  // hash password if it was entered
  if (params.password) {
    user.hash = bcrypt.hashSync(params.password, 10);
  }else{
    throw 'password is required';
  }

  // copy params properties to user
  Object.assign(user, params);

  await user.save();
  return user;
}

async function _delete(id) {
  await User.findByIdAndRemove(id);
}

module.exports = {
  authenticate,
  getById,
  create,
  update,
  delete: _delete,
};

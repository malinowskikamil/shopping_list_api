const expressJwt = require("express-jwt");
const config = require("../config.json");
const userService = require("../services/user");

function jwt() {
  const { secret } = config;
  return expressJwt({ secret, algorithms: ["HS256"], isRevoked }).unless({
    path: [
      // public routes that don't require authentication
      "/recipes",
      "/users/auth",
      "/users/register",
    ],
  });
}

async function isRevoked(req, payload, done) {
  const user = await userService.getById(payload.sub);

  // revoke token if user no longer exists
  if (!user) {
    return done(null, true);
  }

  done();
}

module.exports = jwt;

const jwt = require('jsonwebtoken')

const UserRoles = {
  SUPER_ADMIN: "SUPER_ADMIN",
  ADMIN: "ADMIN",
  USER: "USER"
};

function generateAccessToken(userId, role) {
  return jwt.sign({ id: userId, role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRATION,
  });
}



// responseGenerator.js
module.exports = {
  UserRoles,
  generateAccessToken
};

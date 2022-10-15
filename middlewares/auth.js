const jwt = require('jsonwebtoken');
const {
  UNAUTHORIZED_USER_MESSAGE,
} = require('../utils/constants');
const NotAuthorizedError = require('../errors/NotAuthorizedError');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;

  try {
    payload = jwt.verify(token, 'jsonwebtoken');
  } catch (err) {
    throw new NotAuthorizedError(UNAUTHORIZED_USER_MESSAGE);
  }

  req.user = payload;

  return next();
};

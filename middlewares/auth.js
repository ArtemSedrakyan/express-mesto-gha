const jwt = require('jsonwebtoken');
const {
  UNAUTHORIZED_USER_MESSAGE,
} = require('../utils/constants');
const NotAuthorizedError = require('../errors/NotAuthorizedError');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new NotAuthorizedError(UNAUTHORIZED_USER_MESSAGE);
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, 'jsonwebtoken');
  } catch (err) {
    throw new NotAuthorizedError(UNAUTHORIZED_USER_MESSAGE);
  }

  req.user = payload;

  return next();
};

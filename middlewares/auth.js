const jwt = require('jsonwebtoken');
const {
  UNAUTHORIZED_CODE,
  UNAUTHORIZED_USER_MESSAGE,
} = require('../utils/constants');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(UNAUTHORIZED_CODE).send(UNAUTHORIZED_USER_MESSAGE);
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, 'jsonwebtoken');
  } catch (err) {
    return res.status(UNAUTHORIZED_CODE).send(UNAUTHORIZED_USER_MESSAGE);
  }

  req.user = payload;

  return next();
};

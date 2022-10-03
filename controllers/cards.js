const Card = require('../models/card');
const {
  SERVER_ERROR_CODE,
  BAD_REQUEST_CODE,
  NOT_FOUND_CODE,
  SERVER_ERROR_MESSAGE,
  INVALID_DATA_MESSAGE,
  NOT_FOUND_CARD_ID_MESSAGE,
  CAST_ERROR_MESSAGE,
} = require('../utils/constants');
const NotFoundError = require('../errors/NotFoundError');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ cards }))
    .catch(() => {
      res.status(SERVER_ERROR_CODE).send({ message: SERVER_ERROR_MESSAGE });
    });
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST_CODE).send({ message: INVALID_DATA_MESSAGE });
      } else {
        res.status(SERVER_ERROR_CODE).send({ message: SERVER_ERROR_MESSAGE });
      }
    });
};

module.exports.removeCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .orFail(new NotFoundError(NOT_FOUND_CARD_ID_MESSAGE))
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'NotFound') {
        res.status(NOT_FOUND_CODE).send({ message: NOT_FOUND_CARD_ID_MESSAGE });
      } else if (err.name === 'CastError') {
        res.status(BAD_REQUEST_CODE).send({ message: CAST_ERROR_MESSAGE });
      } else {
        res.status(SERVER_ERROR_CODE).send({ message: SERVER_ERROR_MESSAGE });
      }
    });
};

module.exports.setLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(new NotFoundError(NOT_FOUND_CARD_ID_MESSAGE))
    .then((cards) => res.send(cards))
    .catch((err) => {
      if (err.name === 'NotFound') {
        res.status(NOT_FOUND_CODE).send({ message: NOT_FOUND_CARD_ID_MESSAGE });
      } else if (err.name === 'CastError') {
        res.status(BAD_REQUEST_CODE).send({ message: CAST_ERROR_MESSAGE });
      } else {
        res.status(SERVER_ERROR_CODE).send({ message: SERVER_ERROR_MESSAGE });
      }
    });
};

module.exports.removeLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(new NotFoundError(NOT_FOUND_CARD_ID_MESSAGE))
    .then((cards) => res.send(cards))
    .catch((err) => {
      if (err.name === 'NotFound') {
        res.status(NOT_FOUND_CODE).send({ message: NOT_FOUND_CARD_ID_MESSAGE });
      } else if (err.name === 'CastError') {
        res.status(BAD_REQUEST_CODE).send({ message: CAST_ERROR_MESSAGE });
      } else {
        res.status(SERVER_ERROR_CODE).send({ message: SERVER_ERROR_MESSAGE });
      }
    });
};

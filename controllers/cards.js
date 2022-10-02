const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then(cards => res.send({ cards }))
    .catch((err) => {
      const ERROR_CODE = 404;
      if (err.name === 'UserNotFound')
      return res.status(ERROR_CODE).send({
        "message": "Карточки не найдены"
      })
    });
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then(card => res.send({ data: card }))
    .catch((err) => {
      const ERROR_CODE = 400;
      if (err.name === 'IncorrectRequestData')
      return res.status(ERROR_CODE).send({
        "message": "Переданы некорректные данные"
      })
    });
};

module.exports.removeCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then(user => res.send({data: user}))
    .catch(() => res.status(500).send({message: 'Произошла ошибка'}));
};

module.exports.setLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    {$addToSet: {likes: req.user._id } },
    { new: true }
  )
  .then(cards => res.send(cards))
  .catch(() => res.status(500).send({message: 'Произошла ошибка'}));
};

module.exports.removeLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: {likes: req.user._id} },
    {new: true}
  )
  .then(cards => res.send(cards))
  .catch(() => res.status(500).send({message: 'Произошла ошибка'}));
};


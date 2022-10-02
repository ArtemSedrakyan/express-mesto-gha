const User = require('../models/user');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then(users => res.send({users}))
    .catch((err) => {
      const ERROR_CODE = 404;
      if (err.name === 'UserNotFound')
      return res.status(ERROR_CODE).send({
        "message": "Пользователи не найдены"
      })
    });
};

module.exports.getUserId = (req, res) => {
  User.findById(req.params.userId)
    .then(user => res.send({user}))
    .catch((err) => {
      const ERROR_CODE = 404;
      if (err.name === 'UserNotFound')
      return res.status(ERROR_CODE).send({
        "message": "Пользователь не найден"
      })
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({name, about, avatar})
    .then(user => res.send({ data: user }))
    .catch((err) => {
      const ERROR_CODE = 400;
      if (err.name === 'IncorrectRequestData')
      return res.status(ERROR_CODE).send({
        "message": "Переданы некорректные данные"
      })
    });
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {new: true, runValidators: true, upsert: false}
  )
    .then(user => res.send({ data: user }))
    .catch((err) => {
      const ERROR_CODE = 400;
      if (err.name === 'IncorrectRequestData')
      return res.status(ERROR_CODE).send({
        "message": "Переданы некорректные данные"
      })
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {new: true, runValidators: true, upsert: false}
  )
    .then(user => res.send({ data: user }))
    .catch((err) => {
      const ERROR_CODE = 400;
      if (err.name === 'IncorrectRequestData')
      return res.status(ERROR_CODE).send({
        "message": "Переданы некорректные данные"
      })
    });
};


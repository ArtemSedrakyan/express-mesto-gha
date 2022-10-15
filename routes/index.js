const router = require('express').Router();
const userRouter = require('./users');
const cardRouter = require('./cards');
const auth = require('../middlewares/auth');
const {
  login,
  createUser,
} = require('../controllers/users');
const {
  loginValidation,
  createUserValidation,
} = require('../middlewares/validation');
const NotFoundError = require('../errors/NotFoundError');

router.post('/signin', loginValidation, login);
router.post('/signup', createUserValidation, createUser);

router.use(auth);

router.use('/users', userRouter);
router.use('/cards', cardRouter);

router.use((req, res, next) => {
  next(new NotFoundError('Маршрут не найден'));
});

module.exports = router;

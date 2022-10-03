const SERVER_ERROR_CODE = 500;
const BAD_REQUEST_CODE = 400;
const NOT_FOUND_CODE = 404;
const SERVER_ERROR_MESSAGE = 'Ошибка сервера.';
const INVALID_DATA_MESSAGE = 'Переданы некорректные данные.';
const NOT_FOUND_USER_ID_MESSAGE = 'Пользователь с указанным id не найден.';
const NOT_FOUND_CARD_ID_MESSAGE = 'Карточка с указанным id не найдена.';
const CAST_ERROR_MESSAGE = 'Запрашиваемый адрес не найден.';

module.exports = {
  SERVER_ERROR_CODE,
  BAD_REQUEST_CODE,
  NOT_FOUND_CODE,
  SERVER_ERROR_MESSAGE,
  INVALID_DATA_MESSAGE,
  NOT_FOUND_USER_ID_MESSAGE,
  NOT_FOUND_CARD_ID_MESSAGE,
  CAST_ERROR_MESSAGE,
};

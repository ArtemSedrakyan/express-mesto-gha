class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFound';
    this.satusCode = 404;
  }
}

module.exports = NotFoundError;

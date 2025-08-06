function errorHandler(err, req, res, next) {
  console.error(err.stack);

  // Validation errors
  if (err.name === 'SequelizeValidationError') {
    const errors = err.errors.map(e => ({
      field: e.path,
      message: e.message,
    }));
    return res.status(400).json({ errors });
  }

  // Custom errors
  if (err.message) {
    return res.status(400).json({ message: err.message });
  }

  // Default error
  res.status(500).json({ message: 'Error interno del servidor' });
}

module.exports = errorHandler;
module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || 'Something went wrong at our end!!';
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};

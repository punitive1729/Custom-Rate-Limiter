const express = require('express');
const app = express();
const AppError = require('./utils/AppError');
const globalErrorHandler = require('./Controllers/errorHandler');
const urlRouter = require('./routes/urlRoute');
app.use('/api/v1', urlRouter);
app.all('*', (req, res, next) => {
  next(new AppError(404, `Cannot find ${req.originalUrl} on this server!`));
});
app.use(globalErrorHandler);
module.exports = app;

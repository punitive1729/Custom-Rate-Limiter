// A simple AuthController to ensure that the request has a userId in its headers
const authController = (req, res, next) => {
  const userId = req.headers.userid;
  if (!userId) {
    return next(
      new AppError(
        401,
        'Please login to access the resource. Provide userId in Header.'
      )
    );
  }
  next();
};
module.exports = authController;

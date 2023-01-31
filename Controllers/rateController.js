const AppError = require('./../utils/AppError');
const client = require('./../config/db');
const SLIDING_WINDOW_LOG_SCRIPT = require('./../constants/slidingWindow');
const REQUESTS_PER_WINDOW = process.env.REQUESTS_PER_WINDOW.toString();
const WINDOW_SIZE_IN_MILLISECONDS =
  process.env.WINDOW_SIZE_IN_MILLISECONDS.toString();
const rateLimitController = async (req, res, next) => {
  const userId = req.headers.userid;
  const { originalUrl } = req;

  // REDIS KEY
  const REDIS_KEY = `${userId}:${originalUrl}`;

  let REQ_RESPONSE;

  try {
    REQ_RESPONSE = await client.eval(
      SLIDING_WINDOW_LOG_SCRIPT,
      {
        keys: [REDIS_KEY.toString()],
        arguments: [
          REQUESTS_PER_WINDOW,
          Date.now().toString(),
          WINDOW_SIZE_IN_MILLISECONDS,
        ],
      },
      function (err, reply) {
        console.log('Error: ', err);
        console.log('Reply: ', reply);
      }
    );
    console.log('REQ_RESP: ', REQ_RESPONSE);
  } catch (err) {
    console.log('Error in Lua script: ', err);
    next(
      new AppError(
        500,
        'Something went wrong at our end. Please try again later..'
      )
    );
  }

  if (REQ_RESPONSE.toUpperCase() === 'PASS') {
    return res.status(200).json({
      status: 'success',
    });
  }

  return next(
    new AppError(
      429,
      'Rate Limit Exceeded',
      'Request Limit exhausted. Please try again later'
    )
  );
};

module.exports = rateLimitController;

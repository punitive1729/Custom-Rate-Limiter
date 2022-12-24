const LastMinuteAccessTimesModel = require('../model/LastMinuteAccessTimes');
const rateLimit = process.env.RATE_LIMIT;
const AppError = require('./../utils/AppError');

const getLatestDateForSuccessfullAccess = (date) => {
  const newDate = new Date(date.toISOString());
  console.log(`Old Date: ${newDate}`);
  newDate.setTime(newDate.getTime() + 60 * 1000);
  console.log(`New Date: ${newDate}`);
  return newDate;
};

const getTimeOneMinuteBeforeCurrentInstant = () => {
  // return time 1 minute befor current time
  const date = new Date(new Date().toISOString());
  date.setTime(date.getTime() - 60 * 1000);
  return date;
};

const rateLimitController = async (req, res, next) => {
  const userId = req.headers.userid;
  console.log(userId);
  if (!userId) {
    // send Unauthorized error. Please userid
    next(
      new AppError(
        401,
        'Please login to access the resource. Provide userId in Header.'
      )
    );
  }
  const { originalUrl } = req;
  try {
    const pastDate = getTimeOneMinuteBeforeCurrentInstant();
    // Find how many times userId has successfully accessed originalUrl in last 1 minute
    let response = await LastMinuteAccessTimesModel.aggregate([
      {
        $match: {
          userId: userId,
          url: originalUrl,
          createdAt: { $gte: pastDate },
        },
      },
      {
        $group: {
          _id: '$userId',
          count: { $sum: 1 },
          minTimeStamp: { $min: '$createdAt' },
        },
      },
    ]);
    console.log('Response\n\n', response);
    let lastMinuteCount = 0;
    if (response.length) {
      lastMinuteCount = response[0].count;
      // User has exceeded Rate Limit
      if (lastMinuteCount >= rateLimit) {
        // Find the ealiest successfull access time
        const newDate = getLatestDateForSuccessfullAccess(
          response[0].minTimeStamp
        );
        next(
          new AppError(
            429,
            'Rate Limit Exceeded',
            `You can access next request after ${newDate}`
          )
        );
      }
    }

    // Put this User access record in DB
    response = await LastMinuteAccessTimesModel.create({
      userId: userId,
      url: originalUrl,
    });

    // Check the reponse
    console.log('Access recorded\n', response);
    req.lastMinuteCount = lastMinuteCount + 1;
  } catch (err) {
    next(new AppError(500, 'Something went wrong!!', 'error'));
  }
  next();
};

module.exports = rateLimitController;

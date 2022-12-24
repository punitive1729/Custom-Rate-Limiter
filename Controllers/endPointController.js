const TotalAccessTimesModel = require('../model/TotalAccessTimes');
const AppError = require('./../utils/AppError');
const endPointController = async (req, res, next) => {
  const { originalUrl } = req;
  const lastMinuteCount = req.lastMinuteCount || 0;
  const userId = req.headers.userid;
  console.log(originalUrl, '\n', lastMinuteCount);
  try {
    // Check if user has already accessed the URL
    const doc = await TotalAccessTimesModel.find({
      userId: userId,
      url: originalUrl,
    });
    console.log('Old doc\n', doc);
    let response;
    let count = 1;
    if (doc.length) {
      count = doc[0].count + 1;
      response = await TotalAccessTimesModel.updateOne({
        userId: userId,
        url: originalUrl,
        count: doc[0].count + 1,
      });

      console.log('Updating...\n', response, doc[0].count + 1);
    } else {
      response = await TotalAccessTimesModel.create({
        userId: userId,
        url: originalUrl,
        count: 1,
      });
      console.log('Creating..\n', response);
    }
    console.log('Response\n', response);
    return res.status(200).json({
      status: 'success',
      totalAccessCount: count,
      totalAccessesWithinLastMinute: lastMinuteCount,
      message: 'URL access successfull',
    });
  } catch (err) {
    console.log('Final\n', err);
    next(new AppError(500, 'Something went wrong!!', 'error'));
  }
};

module.exports = endPointController;

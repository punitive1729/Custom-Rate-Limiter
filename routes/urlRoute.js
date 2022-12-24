const router = require('express').Router();
const rateLimitController = require('./../Controllers/rateController');
const endPointController = require('./../Controllers/endPointController');
router.get('/url', rateLimitController, endPointController);
module.exports = router;

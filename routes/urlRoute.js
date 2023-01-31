const router = require('express').Router();
const authController = require('./../Controllers/authController');
const rateLimitController = require('./../Controllers/rateController');
router.get('/url', authController, rateLimitController);
module.exports = router;

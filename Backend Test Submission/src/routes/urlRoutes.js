const express = require('express');
const handler = require('../handler/urlHandler');
const router = express.Router();

router.post('/shorturls', handler.createShortUrl);
router.get('/shorturls/:code', handler.getShortUrlStats);
router.get('/:code', handler.redirectShortUrl);

module.exports = router;

const log = require('../middleware/logger');
const controller = require('../controller/urlController');

function withLogging(fn, pkg) {
  return async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (err) {
      await log("backend", "error", pkg, err.message);
      next(err);
    }
  };
}

module.exports = {
  createShortUrl: withLogging(controller.createShortUrl, "handler"),
  redirectShortUrl: withLogging(controller.redirectShortUrl, "handler"),
  getShortUrlStats: withLogging(controller.getShortUrlStats, "handler"),
};

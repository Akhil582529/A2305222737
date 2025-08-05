// Backend Test Submission/src/controller/urlController.js
const urlService = require('../service/urlService');

exports.createShortUrl = async (req, res, next) => {
  try {
    const { url, validity, shortcode } = req.body;
    const result = await urlService.createShortUrl({ url, validity, shortcode });
    res.status(201).json({ shortLink: `http://localhost:5000/${result.code}`, expiry: result.expiry });
  } catch (err) {
    next(err);
  }
};

exports.redirectShortUrl = async (req, res, next) => {
  try {
    const { code } = req.params;
    const entry = urlService.redirectShortUrl(code);

    // Record click
    urlService.recordClick(code, {
      at: new Date().toISOString(),
      referer: req.get('referer') || "",
      geo: req.ip || "",
    });

    res.redirect(entry.url);
  } catch (err) {
    next(err);
  }
};

exports.getShortUrlStats = async (req, res, next) => {
  try {
    const { code } = req.params;
    const entry = urlService.statShortUrl(code);
    res.json({
      shortLink: `http://localhost:5000/${code}`,
      original: entry.url,
      created: entry.created,
      expiry: entry.expiry,
      clicks: entry.clicks.length,
      clickDetails: entry.clicks.map(c => ({
        at: c.at,
        referer: c.referer,
        geo: c.geo
      }))
    });
  } catch (err) {
    next(err);
  }
};

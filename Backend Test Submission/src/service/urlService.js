const { getShortUrl, saveShortUrl } = require('../repository/urlRepository');

function generateShortCode(len = 6) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let s = '';
  for (let i = 0; i < len; ++i) s += chars[Math.floor(Math.random() * chars.length)];
  return s;
}

function validateUrl(url) {
  try { new URL(url); return true; } catch { return false; }
}

async function createShortUrl({ url, validity, shortcode }) {
  if (!url || !validateUrl(url)) throw { status: 400, message: "Malformed input: Invalid URL." };

  let code = shortcode || generateShortCode();
  if (getShortUrl(code)) throw { status: 409, message: "Shortcode collision, already exists." };

  const now = new Date();
  const expiry = new Date(now.getTime() + (validity || 30) * 60000).toISOString();
  const details = { url, expiry, created: now.toISOString(), clicks: [] };

  saveShortUrl(code, details);

  return { code, expiry: details.expiry };
}

function redirectShortUrl(code) {
  const entry = getShortUrl(code);
  if (!entry) throw { status: 404, message: "Shortcode not found" };
  if (new Date() > new Date(entry.expiry)) throw { status: 410, message: "URL expired" };
  return entry;
}

function statShortUrl(code) {
  const entry = getShortUrl(code);
  if (!entry) throw { status: 404, message: "Shortcode not found" };
  return entry;
}

function recordClick(code, clickData) {
  const entry = getShortUrl(code);
  if (!entry) return;
  entry.clicks.push(clickData);
}

module.exports = { createShortUrl, redirectShortUrl, statShortUrl, recordClick };

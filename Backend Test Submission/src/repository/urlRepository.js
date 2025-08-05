const urls = new Map();

function saveShortUrl(shortcode, details) {
  urls.set(shortcode, details);
}

function getShortUrl(shortcode) {
  return urls.get(shortcode);
}

function getAllShortUrls() {
  return Array.from(urls.entries());
}

module.exports = { saveShortUrl, getShortUrl, getAllShortUrls };

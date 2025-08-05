export async function createShortUrl(url, validity, shortcode) {
  const resp = await fetch('http://localhost:5000/shorturls', {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url, validity, shortcode })
  });
  return resp.json();
}

export async function getStats(code) {
  const resp = await fetch(`http://localhost:5000/shorturls/${code}`);
  return resp.json();
}

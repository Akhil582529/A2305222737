const axios = require('axios');
const config = require('../Backend Test Submission/src/config/config');

let token = null;
async function getAuthToken() {
  if (token) return token;
  const res = await axios.post('http://20.244.56.144/evaluation-service/auth', {
    email: config.email,
    name: config.name,
    rollNo: config.rollNo,
    accessCode: config.accessCode,
    clientID: config.clientID,
    clientSecret: config.clientSecret,
  });
  token = res.data.access_token;
  return token;
}

// stack: "backend", level: "error" (etc), package: "service" (etc)
async function log(stack, level, pkg, message) {
  try {
    const access_token = await getAuthToken();
    await axios.post('http://20.244.56.144/evaluation-service/logs',
      { stack, level, package: pkg, message },
      { headers: { Authorization: `Bearer ${access_token}` } }
    );
  } catch (err) {/* don't recurse or throw */}
}
module.exports = log;

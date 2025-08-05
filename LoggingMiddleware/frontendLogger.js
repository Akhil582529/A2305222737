import config from '../Frontend Test Submission/src/config/config';

let token = config.accessToken; 

export async function log(stack, level, pkg, message) {
  try {
    await fetch('http://20.244.56.144/evaluation-service/logs', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ stack, level, package: pkg, message }),
    });
  } catch (e) {}
}

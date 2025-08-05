import config from "../config/config";
export async function log(stack, level, pkg, message) {
  try {
    await fetch('http://20.244.56.144/evaluation-service/logs', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${config.accessToken}`,
      },
      body: JSON.stringify({ stack, level, package: pkg, message }),
    });
  } catch (e) {}
}

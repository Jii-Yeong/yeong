const apiUrl = process.env.READLY_API_URL?.replace(/\/$/, '');
const clientUrl = process.env.CLIENT_URL?.replace(/\/$/, '');

if (!apiUrl || !clientUrl) {
  console.error('READLY_API_URL and CLIENT_URL are required.');
  process.exit(1);
}

const healthResponse = await fetch(`${apiUrl}/health`);
if (!healthResponse.ok) {
  console.error(`Health check failed with status ${healthResponse.status}.`);
  process.exit(1);
}

const health = await healthResponse.json();
if (health.status !== 'ok') {
  console.error('Health check returned an unexpected response.');
  process.exit(1);
}

const preflightResponse = await fetch(`${apiUrl}/user/my-info`, {
  method: 'OPTIONS',
  headers: {
    Origin: clientUrl,
    'Access-Control-Request-Method': 'GET',
    'Access-Control-Request-Headers': 'authorization,content-type',
  },
});
const allowedOrigin = preflightResponse.headers.get(
  'access-control-allow-origin',
);

if (preflightResponse.status !== 204 || allowedOrigin !== clientUrl) {
  console.error(
    `CORS preflight failed: status=${preflightResponse.status}, origin=${allowedOrigin}`,
  );
  process.exit(1);
}

console.info(
  JSON.stringify({
    status: 'ok',
    checks: ['health', 'cors-preflight'],
    apiUrl,
    clientUrl,
  }),
);

// Vercel Serverless Function - API Proxy untuk handle HTTP backend dari HTTPS frontend
export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,PATCH,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    // Get path dari query parameter
    const path = req.query.path ? req.query.path.join('/') : '';

    // Backend API URL
    const backendUrl = `http://sim-ternak-api.runasp.net/api/${path}`;

    // Prepare request options
    const options = {
      method: req.method,
      headers: {
        'Content-Type': 'application/json',
        ...(req.headers.authorization && {
          'Authorization': req.headers.authorization
        }),
      },
    };

    // Add body for POST, PUT, PATCH
    if (['POST', 'PUT', 'PATCH'].includes(req.method) && req.body) {
      options.body = JSON.stringify(req.body);
    }

    // Forward request ke backend
    const response = await fetch(backendUrl, options);
    const data = await response.json();

    // Return response dari backend
    return res.status(response.status).json(data);

  } catch (error) {
    console.error('Proxy error:', error);
    return res.status(500).json({
      success: false,
      message: 'Proxy error',
      error: error.message
    });
  }
}

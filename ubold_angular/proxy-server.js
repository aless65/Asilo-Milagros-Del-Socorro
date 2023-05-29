const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// Define the proxy route
app.use('/1', createProxyMiddleware({
  target: 'https://api.imgbb.com',
  changeOrigin: true,
  headers: {
    "Access-Control-Allow-Headers": "*", // this will allow all CORS requests
    "Access-Control-Allow-Methods": 'OPTIONS,POST,GET', // this states the allowed methods
    "Content-Type": "application/json" // this shows the expected content type
  },
}));

// Start the server
const port = 3000; // Choose a suitable port number
app.listen(port, () => {
  console.log(`Proxy server listening on port ${port}`);
});

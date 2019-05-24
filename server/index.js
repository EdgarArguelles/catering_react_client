const express = require('express');
const compression = require('compression');
const path = require('path');

const app = express();

// compress files to load them faster
app.use(compression());

// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', 'dist')));

// Always return the main index.html, so react-router render the route in the client
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'dist', 'index.html'));
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, '::', () => {
  console.log(`App listening on port ${PORT}!`); // eslint-disable-line no-console
});
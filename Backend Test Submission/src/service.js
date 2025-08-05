const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const urlRoutes = require('./route/urlRoutes');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/', urlRoutes); // Serves /shorturls POST, GET and /:code redirects

// Error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ error: err.message });
});

app.listen(5000, () => console.log('Backend running on port 5000'));

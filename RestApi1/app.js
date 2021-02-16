const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const newsRoutes = require('./routes/newsRoutes');

app.use(bodyParser.json()); //application/json

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, PATCH, DELETE',
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use(newsRoutes);

app.listen(8080, () => {
  console.log(`listening on http://localhost:8080`);
});

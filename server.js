const express = require('express');
const app = express();
const port = process.env.PORT || '3000';

app.get('/', (req, res) => {
  res.send('<h1>Hello World of MERN stack!</h1>');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

//node server.js

const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3001;

app.use(express.static(path.join(__dirname, 'public')));
app.use(require('./controllers/routes'));

app.listen(port, () => console.log(`Listening on port ${port}`));
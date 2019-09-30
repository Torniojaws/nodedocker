const app = require('express')();
const bodyParser = require('body-parser');
const routes = require('./routes');
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());

app.use('/', routes);

module.exports = app.listen(port, () => console.log(`Listening on ${port}`));

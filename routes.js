const app = require('express')();
const hello = require('./apps/hello/controller');

app.route('/')
  .get(hello.root);

app.route('/hello')
  .get(hello.hello)
  .post(hello.add);

app.route('/hello/:id')
  .get(hello.helloById)
  .put(hello.editById)
  .delete(hello.remove);

module.exports = app;

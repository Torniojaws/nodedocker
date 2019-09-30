const chai = require('chai').use(require('chai-http'));
const expect = chai.expect;
const server = require('../../index');

describe('GET /', () => {
  it('should return Root message', () => {
    chai.request(server)
      .get('/')
      .end((err, res) => {
        if (err) throw err;
        expect(res.status).to.eql(200);
        expect(res.body).to.eql({
          success: true,
          data: 'I am root'
        });
      });
  });
});

describe('GET /hello', () => {
  it('should return Hello message', () => {
    chai.request(server)
      .get('/hello')
      .end((err, res) => {
        if (err) throw err;
        expect(res.status).to.eql(200);
        expect(res.body).to.eql({
          success: true,
          data: 'Hello'
        });
      });
  });
});

describe('GET /hello/:id', () => {
  it('should return Hello message for ID', () => {
    chai.request(server)
      .get('/hello/123')
      .end((err, res) => {
        if (err) throw err;
        expect(res.status).to.eql(200);
        expect(res.body).to.eql({
          success: true,
          data: 'Hello, My Name'
        });
      });
  });
});

describe('POST /hello', () => {
  it('should add Hello message', () => {
    chai.request(server)
      .post('/hello')
      .send({ name: 'My Name' })
      .end((err, res) => {
        if (err) throw err;
        expect(res.status).to.eql(201);
        expect(res.body).to.eql({
          success: true,
          data: 'Hello, My Name'
        });
      });
  });
});

describe('PUT /hello/:id', () => {
  it('should edit Hello message for ID', () => {
    chai.request(server)
      .put('/hello/123')
      .send({ name: 'My Name' })
      .end((err, res) => {
        if (err) throw err;
        expect(res.status).to.eql(200);
        expect(res.body).to.eql({
          success: true,
          data: 'I am now up to date, My Name'
        });
      });
  });
});

describe('DELETE /hello/:id', () => {
  it('should remove message for ID', () => {
    chai.request(server)
      .delete('/hello/123')
      .end((err, res) => {
        if (err) throw err;
        expect(res.status).to.eql(200);
        expect(res.body).to.eql({
          success: true,
          data: 'Bye bye, My Name'
        });
      });
  });
});

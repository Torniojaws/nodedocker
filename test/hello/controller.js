const chai = require('chai')
  .use(require('chai-http'))
  .use(require('chai-exclude'));
const expect = chai.expect;
const db = require('../../libs/database/controller');
const server = require('../../index');
const dotenv = require('dotenv');
dotenv.config({ path: '../../.env' });

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
        expect(err).to.eql(null);
        if (err) throw err;
        expect(res.status).to.eql(200);
        expect(res.body.success).to.eql(true);
        expect(res.body).excludingEvery(['created']).to.eql({
          success: true,
          data: [
            {
              id: 1,
              message: 'Hello, My Name'
            }, {
              id: 2,
              message: 'Yohoo, this Name'
            }]
        });
      });
  });
});

describe('GET /hello/:id', () => {
  it('should return Hello message for ID', () => {
    chai.request(server)
      .get('/hello/1')
      .end((err, res) => {
        if (err) throw err;
        expect(res.status).to.eql(200);
        expect(res.body).excludingEvery('created').to.eql({
          success: true,
          data: [{
            id: 1,
            message: 'Hello, My Name'
          }]
        });
      });
  });
});

describe('POST /hello', () => {
  after(async () => {
    await db.query({
      sql: 'DELETE FROM hello WHERE message = ?',
      values: ['Testing']
    });
  });

  it('should add a Hello message', () => {
    chai.request(server)
      .post('/hello')
      .send({ message: 'Testing' })
      .end((err, res) => {
        if (err) throw err;
        expect(res.status).to.eql(201);
        expect(res.body.success).to.eql(true);
        expect(res.body.data.id).to.satisfy(Number.isInteger);
        expect(res.body.data.message).to.eql('Testing');
      });
  });
});

describe('PUT /hello/:id', () => {
  after(async () => {
    await db.query({
      sql: 'UPDATE hello SET message = ? WHERE id = ?',
      values: ['Yohoo, this Name', 2]
    });
  });

  it('should edit Hello message for ID', () => {
    chai.request(server)
      .put('/hello/2')
      .send({ message: 'Put that cookie down' })
      .end((err, res) => {
        if (err) throw err;
        expect(res.status).to.eql(200);
        expect(res.body.success).to.eql(true);
        expect(res.body.data).excludingEvery('created').to.eql([{
          id: 2,
          message: 'Put that cookie down'
        }]);
      });
  });
});

describe('DELETE /hello/:id', () => {
  before(async () => {
    await db.query({
      sql: 'INSERT INTO hello(id, message) VALUES (?, ?)',
      values: [3, 'Testing delete']
    });
  });

  after(async () => {
    await db.query({
      sql: 'DELETE FROM hello WHERE id = ?',
      values: [3]
    });
  });

  it('should remove message for ID', () => {
    chai.request(server)
      .delete('/hello/3')
      .end((err, res) => {
        if (err) throw err;
        expect(res.status).to.eql(204);
        expect(res.body).to.eql({});
      });
  });
});

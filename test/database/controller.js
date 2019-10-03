const chai = require('chai');
const expect = chai.expect;
const dotenv = require('dotenv');
dotenv.config();
const db = require('../../libs/database/controller');

describe('Test database reading', () => {
  beforeEach(async () => {
    // Sometimes this hangs around after the other tests
    await db.query({
      sql: 'DELETE FROM hello WHERE message = ?',
      values: ['Testing, This Name']
    });
  });

  it('should get all rows', async () => {
    expect(process.env.DB_HOST).to.eql('127.0.0.1');
    expect(process.env.DB_NAME).to.eql('mydb');
    expect(process.env.DB_EXT_PORT).to.eql('3310');
    const sql = 'SELECT * FROM hello';
    const options = {
      sql,
      values: []
    };
    const data = await db.query(options);
    expect(data.length).to.eql(2);
    expect(data[0].message).to.eql('Hello, My Name');
  });
});

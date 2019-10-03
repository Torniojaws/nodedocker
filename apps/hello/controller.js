const db = require('../../libs/database/controller');

const root = (req, res) => res.json({
  success: true,
  data: 'I am root'
});

// Return all messages
const hello = async (req, res) => {
  try {
    res.json({
      success: true,
      data: await db.query({
        sql: 'SELECT * FROM hello',
        values: []
      })
    });
  } catch (err) {
    res.json({
      success: false,
      error: err
    });
  }
};

const helloById = async (req, res) => {
  const id = parseInt(req.params.id);
  res.json({
    success: true,
    data: await db.query({
      sql: 'SELECT * FROM hello WHERE id = ?',
      values: [id]
    })
  });
};

const add = async (req, res) => {
  // TODO: Schema
  const message = req.body.message;
  const options = {
    sql: 'INSERT INTO hello(`message`) VALUES (?)',
    values: [message]
  };
  let insertId = null;
  try {
    const dbInsert = await db.query(options);
    insertId = dbInsert.insertId;
  } catch (e) {
    res.json({ success: false, error: 'Could not add message' });
  }
  res.status(201).json({
    success: true,
    data: {
      id: insertId,
      message
    }
  });
};

const editById = async (req, res) => {
  const message = req.body.message;
  const id = parseInt(req.params.id);
  const options = {
    sql: 'UPDATE hello SET message = ? WHERE id = ?',
    values: [message, id]
  };
  try {
    await db.query(options);
  } catch (e) {
    res.json({ success: false, error: 'Could not edit message' });
  }
  res.json({
    success: true,
    data: [{
      id,
      message
    }]
  });
};

const remove = async (req, res) => {
  const id = parseInt(req.params.id);
  const options = {
    sql: 'DELETE FROM hello WHERE id = ?',
    values: [id]
  };
  try {
    await db.query(options);
  } catch (e) {
    res.json({ success: false, error: 'Could not edit message' });
  }
  res.status(204).json();
};

module.exports = {
  add,
  editById,
  hello,
  helloById,
  remove,
  root
};

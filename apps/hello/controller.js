const root = (req, res) => res.json({
  success: true,
  data: 'I am root'
});

const hello = (req, res) => res.json({
  success: true,
  data: 'Hello'
});

const getName = id => parseInt(id) === 123 ? 'My Name' : 'Example';

const helloById = (req, res) => {
  const name = getName(req.params.id);
  res.json({
    success: true,
    data: `Hello, ${name}`
  });
};

const add = (req, res) => res.status(201).json({
  success: true,
  data: `Hello, ${req.body.name}`
});

const editById = (req, res) => {
  const name = getName(req.params.id);
  res.json({
    success: true,
    data: `I am now up to date, ${name}`
  });
};

const remove = (req, res) => {
  const name = getName(req.params.id);
  res.status(200).json({
    success: true,
    data: `Bye bye, ${name}`
  });
};

module.exports = {
  add,
  editById,
  hello,
  helloById,
  remove,
  root
};

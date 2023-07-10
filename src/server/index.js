const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const bodyParser = require('body-parser');

server.use(middlewares);
server.use(bodyParser.json()); // Parse JSON request bodies

// GET endpoint to retrieve all users
server.get('/users', (req, res) => {
  const users = router.db.get('users').value();
  res.send(users);
});


// POST endpoint to handle user registration
server.post('/users', (req, res) => {
  const newUser = req.body;
  router.db.get('users').push(newUser).write();
  res.send(newUser);
});

server.delete('/users/:mobile', (req, res) => {
  const mobileNumber = req.params.mobile;
  const user = router.db.get('users').find({ mobile: mobileNumber }).value();

  if (user) {
    router.db.get('users').remove({ mobile: mobileNumber }).write();
    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
});

server.use(router);
server.listen(3001, () => {
  console.log('JSON Server is running on port 3001');
});

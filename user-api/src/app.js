const express = require('express');
const {MongoClient} = require('mongodb');
const UserRepository = require('./user-repository');
const bodyParser = require('body-parser');
const { ObjectId } = require('mongodb');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors({
  allowedHeaders: ['X-Total-Count', 'Content-type'],
  exposedHeaders: ['X-Total-Count', 'Content-type'],
}));

let userRepository;
let client;
let connected = false;

app.use(async (req, res, next) => {
  if (!connected) {
    const uri = 'mongodb://127.0.0.1:27017/users_db'; // Uso local
    // const uri = 'mongodb://root:root@localhost:27017'; // Uso Docker Workflow
    client = new MongoClient(uri);
    await client.connect();
    const collection = client.db('users_db').collection('users');
    userRepository = new UserRepository(collection);
    connected = true;
  }

  next();
});

app.get('/users', async (request, response) => {
  const users = await userRepository.findAll();
  response.setHeader('X-Total-Count', users.length);
  response.status(200).json(users);
});

app.post('/users', async (request, response) => {
  const user = await userRepository.insert(request.body);
  response.status(201).json(user);
});

app.get('/users/:id', async (request, response) => {
  try {
    const user = await userRepository.findOneById(new ObjectId(request.params.id));
    response.json(user);
  } catch {
    response.status(404).json({
      message: 'User not found',
      code: 404,
    });
  }
});

app.put('/users/:id', async (request, response) => {
  try {
    const user = await userRepository.update(new ObjectId(request.params.id), request.body);
    response.json(user);
  } catch {
    response.status(404).json({
      message: 'User not found',
      code: 404,
    });
  }
});

app.delete('/users/:id', async (request, response) => {
  try {
    await userRepository.delete(new ObjectId(request.params.id));
    return response.status(204).end();
  } catch (e) {
    console.error('Delete error:', e.message);
    return response.status(404).json({
      message: 'User not found',
      code: 404,
    });
  }
});

app.get('/api/healthcheck', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

module.exports = app;

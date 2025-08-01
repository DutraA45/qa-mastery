const {MongoClient} = require('mongodb');
const UserRepository = require('./user-repository.js');

(async () => {
  //  const uri = 'mongodb://127.0.0.1:27017/users_db';  // Uso local
  const uri = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/users_db'; // Uso Docker Workflow
  const client = new MongoClient(uri);
  await client.connect();
  const collection = client.db().collection('users');
  const userRepository = new UserRepository(collection);
  await userRepository.deleteAll();
  await client.close();
  console.log('Database cleared');
})();

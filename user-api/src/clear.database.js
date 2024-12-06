const { MongoClient } = require("mongodb");
const UserRepository = require('./user-repository.js');

(async () => {
    const uri = 'mongodb://adm:123@127.0.0.1:27017/?authSource=admin'
    const client = new MongoClient(uri)
    await client.connect();
    const collection = client.db('users_db').collection('users');
    const userRepository = new UserRepository(collection)
    await userRepository.deleteAll()
    await client.close();
    console.log('Database cleared')
})()
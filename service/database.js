const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('startup');
const userCollection = db.collection('user');
const friendRequestCollection = db.collection('friendRequests');

// This will asynchronously test the connection and exit the process if it fails
(async function testConnection() {
  try {
    await db.command({ ping: 1 });
    console.log(`Connect to database`);
  } catch (ex) {
    console.log(`Unable to connect to database with ${url} because ${ex.message}`);
    process.exit(1);
  }
})();


// BELOW ARE THE DATABASE FUNCTIONS USED IN THE EXAMPLE AND I"M JUST USING FOR INSPO
function getUser(username) {
  return userCollection.findOne({ username: username });
}

function getUserByToken(token) {
  return userCollection.findOne({ token: token });
}

async function addUser(user) {
  await userCollection.insertOne(user);
}

async function updateUser(user) {
  await userCollection.updateOne({ username: user.username }, { $set: user });
}

async function addFriendRequest(friendRequest) {
  return friendRequestCollection.insertOne(friendRequest);
}

function getFriendRequestsForUser(username) {
  return friendRequestCollection.find({ recipientUsername: username }).toArray();
}

async function removeFriendRequest(senderUsername, recipientUsername) {
  return friendRequestCollection.deleteOne({ senderUsername, recipientUsername });
}

function findFriendRequest(senderUsername, recipientUsername) {
  return friendRequestCollection.findOne({ senderUsername, recipientUsername });
}

module.exports = {
  getUser,
  getUserByToken,
  addUser,
  updateUser,
  addFriendRequest,
  getFriendRequestsForUser,
  removeFriendRequest,
  findFriendRequest,
};

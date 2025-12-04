const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

async function clearDatabase() {
    const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
    const client = new MongoClient(url);

    try {
        await client.connect();
        const db = client.db('startup');

        await db.collection('user').deleteMany({});
        await db.collection('friendRequests').deleteMany({});
        console.log('Successfully cleared database for testing.');
    } catch (error) {
        console.error('Error clearing database:', error);
    } finally {
        await client.close();
    }
}

clearDatabase();

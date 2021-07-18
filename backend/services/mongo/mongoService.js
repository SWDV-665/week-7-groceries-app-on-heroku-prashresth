const MongoClient = require("mongodb").MongoClient
// this mongo atlas free account can be accessed from anywhere.
const urlMongo = process.env.mongoConn;
let db;

// make a connection to mongo db
async function connectToMongo() {
    try {
        return await MongoClient.connect(urlMongo,  { useUnifiedTopology: true , useNewUrlParser: true });
    }
    catch (err) {
        console.log(err);
        throw err;
    }
}

async function getDb(dbName) {
    try {
        const client = await connectToMongo();
        db = await client.db(dbName);
        // return client and db info to access collections and to close
        // connection after calls are made.
        return {client: client, db: db};
    }
    catch (err) {
        console.log(err);
        throw err;
    }
}

module.exports = {getDb}
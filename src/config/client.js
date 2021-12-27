const path = require('path');
const { MongoClient } = require('mongodb');
const { dbUrl, certName, dbName } = require('./config');

const certPath = path.join(__dirname, `../../certs/${certName}`);

async function createConnection() {
  const client = new MongoClient(dbUrl, {
    sslKey: certPath,
    sslCert: certPath,
  });
  await client.connect();
  return (collectionName) => client.db(dbName).collection(collectionName);
}

module.exports = {
  createConnection,
};

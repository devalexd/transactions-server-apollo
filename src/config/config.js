const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const envVars = process.env;

const dbUrl = 'mongodb+srv://cluster0.arf91.mongodb.net/myFirstDatabase?authSource=%24external&authMechanism=MONGODB-X509&retryWrites=true&w=majority';

module.exports = {
  port: envVars.PORT,
  dbUrl,
  certName: envVars.CERTNAME,
  dbName: envVars.DBNAME,
};

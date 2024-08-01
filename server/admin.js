// server/admin.js
const admin = require('firebase-admin');
const serviceAccount = require('./config/serviceAccountKey.json'); // Path to your service account key

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;

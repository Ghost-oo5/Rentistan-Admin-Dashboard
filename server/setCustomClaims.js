// server/setCustomClaims.js
const admin = require('./admin'); // Import the admin module

async function setAdmin(uid) {
  try {
    await admin.auth().setCustomUserClaims(uid, { admin: true });
    console.log(`Custom claims set for user ${uid}`);
  } catch (error) {
    console.error('Error setting custom claims:', error);
  }
}

// Call this function with the UID of the admin you want to grant privileges to
setAdmin('nl1QcXTexFMTMTxCRyAf98nBlJs1'); // Replace with the actual UID

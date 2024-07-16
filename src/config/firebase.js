const admin = require("firebase-admin");
// const serviceAccount = require("./serviceAccountKey.json");
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
require("dotenv").config();
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: `${process.env.FIREBASE_STORAGE_BUCKET}.appspot.com`,
});

const bucket = admin.storage().bucket();

module.exports = { bucket };

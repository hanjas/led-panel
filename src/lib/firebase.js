const admin = require('firebase-admin');
const constants = require('../constants/constants')

let db = null;

exports.initFirebase = () => {
  if (db) return db;

  const serviceAccount = require(constants.firebase.certFilePath);
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: constants.firebase.firebaseDatabaseURL,
  });
  db = admin.database();
  
  return db
}

exports.listen = (callback) => {
  const dataRef = db.ref(constants.firebase.firebaseChannel);
  dataRef.on('value', callback);
  process.stdin.resume();
}

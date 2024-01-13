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

exports.listenRGB = (handler) => {
  const dataRef = db.ref(constants.firebase.rgbChannel);
  dataRef.on('value', handler);
  process.stdin.resume();
}

exports.listenAnimation = (handler) => {
  const dataRef = db.ref(constants.firebase.animationChannel);
  dataRef.on('value', handler);
  process.stdin.resume();
}

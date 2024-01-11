const firebase = require('./lib/firebase');
const led = require('./lib/led');
const msgHandler = require('./handlers/msgHandler');

const start = () => {
  try {
    led.initLED();
    firebase.initFirebase();
    firebase.listen(msgHandler);
  } catch (error) {
    console.log(`Error: ${error}`)
  }
};

process.on('SIGINT', () => {
  console.log("exiting...");
  led.clearLED();
  process.exit();
});

start();

const firebase = require('./lib/firebase');
const led = require('./lib/led');
const msgHandler = require('./handlers/msgHandler');

const start = () => {
  try {
    led.initLED();
    firebase.initFirebase();
    firebase.listenRGB(msgHandler.ledRGBHandler);
    firebase.listenAnimation(msgHandler.animationHanlder);
  } catch (error) {
    console.log(`Error: ${error}`)
  }
};

process.on('SIGINT', () => {
  console.log("exiting...");
  led.turnOffAllLED();
  led.clearLED();
  process.exit();
});

start();

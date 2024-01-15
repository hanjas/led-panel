const firebase = require('./lib/firebase');
const led = require('./lib/led');
const relay = require('./lib/relay');
const { ledRGBHandler } = require('./handlers/msgHandler');
const { animationHanlder } = require('./handlers/animationHandler');
const { relayHandler } = require('./handlers/relayHandler');

const init = () => {
  led.initLED();
  relay.init();
  firebase.initFirebase();
}

const start = () => {
  firebase.listenRGB(ledRGBHandler);
  firebase.listenAnimation(animationHanlder);
  firebase.listenRelay(relayHandler);
}

const main = () => {
  try {
    init();
    start();
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

main();

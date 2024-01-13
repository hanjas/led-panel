const ws281x = require('rpi-ws281x-native');
const { rgbToDec } = require('../utils');
const constants = require('../constants/constants');

const LED_COUNT = 210;
const DMA_CHANNEL = 10;
const LED_OPTIONS = {
  dma: DMA_CHANNEL,
  freq: 800000,
  gpio: constants.led.gpio,
  invert: false,
  brightness: 255,
  stripType: ws281x.stripType.WS2812
};

let channel = null;

exports.initLED = () => {
  try {
    channel = ws281x(LED_COUNT, LED_OPTIONS);
    return channel;
  } catch (error) {
    console.error('Error initializing LED channel:', error);
    return null;
  }
};

exports.showLED = (idx, r, g, b) => {
  if (!channel) {
    console.error('LED channel not initialized. Call initLED() first.');
    return;
  }
  const rgbDec = rgbToDec(r, g, b);
  channel.array[idx] = rgbDec;
  ws281x.render();
};

exports.resetLED = () => {
  ws281x.reset();
};

exports.clearLED = () => {
  exports.resetLED();
};

exports.turnOffAllLED = () => {
  const black = new Array(LED_COUNT).fill({ r: 0, g: 0, b: 0 });
  ws281x.render(black);
  ws281x.show();
};

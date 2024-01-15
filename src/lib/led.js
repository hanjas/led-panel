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

exports.resetLED = () => {
  ws281x.reset();
};

exports.clearLED = () => {
  exports.resetLED();
};

exports.turnOffAllLED = () => {
  const black = new Array(LED_COUNT).fill({ r: 0, g: 0, b: 0 });
  ws281x.render(black);
};

exports.showRGB = async (idx, r, g, b) => {
  if (!channel) {
    console.error('LED channel not initialized. Call initLED() first.');
    return;
  }
  channel.array[idx] = rgbToDec(r, g, b);
};

exports.renderLED = async (idx, r, g, b) => {
  ws281x.render();
};

function delay(time) {
  return new Promise(resolve => {
    setTimeout(resolve, time);
  });
}

exports.showAnimation = async function (frames) {
  for (const frame of frames) {
    for (const subarray of frame.data) {
      await delay(frame.time);
      const [ledIdx, r, g, b] = subarray;
      this.showRGB(ledIdx, r, g, b);
    }
  }
}

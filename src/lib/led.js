const ws2821x = require('rpi-ws281x-native');
const { rgbToDec } = require('../utils')
const constants = require('../constants/constants')

let channel = null;

exports.initLED = () => {
  const options = {
    dma: 10,
    freq: 800000,
    gpio: constants.led.gpio,
    invert: false,
    brightness: 255,
    stripType: ws2821x.stripType.WS2812
  };
  const channel = ws2821x(210, options);
  return channel
}

exports.showLED = (idx, r, g, b) => {
  const rgbDec = rgbToDec(r, g, b);
  channel.array[idx] = rgbDec;
  ws2821x.render();
}

exports.resetLED = () => {
  ws281x.reset();
}

exports.clearLED = () => {
  ws281x.finalize();
}

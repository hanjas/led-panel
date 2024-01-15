const led = require('../lib/led')

exports.ledRGBHandler = (payload) => {
  console.log(`RGB payload: ${payload.val()}`);

  const data = payload.val();
  const dataSplit = data.split('/');
  const [ledIdx, r, g, b] = dataSplit[2].split(',');

  led.showRGB(ledIdx, r, g, b)
}
const led = require('../lib/led')

exports.ledRGBHandler = (payload) => {
  console.log(`RGB payload: ${payload.val()}`);
  
  const data = payload.val();
  const dataSplit = data.split('/');
  const [ ledIdx, r, g, b ] = dataSplit[2].split(',');

  led.showRGB(ledIdx, r, g, b)
}

exports.animationHanlder = async (payload) => {
  const data = payload.val();
  console.log(`Animation payload: ${JSON.stringify(data)}`)

  if (!('frames' in data)) {
    console.error('Incorrect payload. missing field frames');
    return;
  }

  while (true) {
    await led.showAnimation(data.frames)
  }
}
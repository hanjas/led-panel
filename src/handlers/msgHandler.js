const led = require('../lib/led')

module.exports = (payload) => {
  console.log(`kafka msg: ${payload.val()}`);
  
  const data = payload.val();
  const dataSplit = data.split('/');
  const [ ledIdx, r, g, b ] = dataSplit[2].split(',');

  led.showLED(ledIdx, r, g, b)
}
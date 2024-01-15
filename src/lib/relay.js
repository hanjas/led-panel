const GPIO = require('onoff').Gpio

let r1 = null;
let r2 = null;

exports.init = () => {
  r1 = new GPIO(17, 'low');
  r2 = new GPIO(27, 'low');
}

exports.switchRelay = (rNo, value) => {
  if (rNo == 1) r1.writeSync((value) ? GPIO.HIGH : GPIO.LOW)
  else if (rNo == 2) r2.writeSync((value) ? GPIO.HIGH : GPIO.LOW)
}
const relay = require('../lib/relay');

// payload = [true, false]
exports.relayHandler = (payload) => {
  console.log(`Relay payload: ${payload.val()}`);
  
  const [ r1State, r2State ] = payload.val();
  relay.switchRelay(1, r1State);
  relay.switchRelay(2, r2State);
}
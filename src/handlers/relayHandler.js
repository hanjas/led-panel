const relay = require('../lib/relay');

// payload = [true, false]
exports.relayHandler = (payload) => {
  const data = payload.val();
  console.log(`Relay payload: ${data}`);

  if (!data) return;

  const { relay1, relay2 } = payload.val();
  relay.switchRelay(1, !!relay1);
  relay.switchRelay(2, !!relay2);
}
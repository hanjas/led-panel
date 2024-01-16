const firebase = require('../lib/firebase');
const constants = require('../constants/constants')
const { animationHandler } = require('./animationHandler');
const { paintHandler } = require('./paintHandler');

/**
 * 
 *  {
      source: 'animation' // 'animation' or 'rt-paint',
      topic: 'arrow' // use this topic for subscribing to animation
    }
 */

const handleConfig = (data) => {
  const source = data?.source
  if (source == 'animation') {
    firebase.listen(`/animations_${constants.panelName}/${data.topic}`, animationHandler);
  }
  else if (source == 'rtpaint') {
    firebase.listen(`/rtpaint_${constants.panelName}`, paintHandler);
  }
  else if (source == 'relay') {
  }
}

exports.configHandler = (payload) => {
  const data = payload.val();
  console.log(`Config payload: ${JSON.stringify(data)}`);

  if (!data) return;

  handleConfig(data);
}
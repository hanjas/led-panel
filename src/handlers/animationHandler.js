const led = require('../lib/led');

let transitionRuntimeOffset = 0;
let currentFrameIndex = 0;
let currLEDMap = {}
let looper = null;
let tempLEDMap = {};

const getIndvidualColorCode = (prev, next, transitionTime, currentTime) => {
  const diff = next - prev;
  return Math.max(0, Math.min(255, prev + (diff * currentTime / transitionTime)));
}

const getColorCode = (prev, next, transitionTime, currentTime) => {
  return [
    Math.floor(getIndvidualColorCode(prev[0], next[0], transitionTime, currentTime)),
    Math.floor(getIndvidualColorCode(prev[1], next[1], transitionTime, currentTime)),
    Math.floor(getIndvidualColorCode(prev[2], next[2], transitionTime, currentTime)),
    parseFloat(getIndvidualColorCode(prev[3], next[3], transitionTime, currentTime).toFixed(2)),
  ]
}

const getLEDState = (addr) => {
  return currLEDMap[addr] || [0, 0, 0, 0]
}

const runTransition = (frames, currentFrameIndex) => {

  const currentFrame = frames[currentFrameIndex];
  const currentTransitionRuntime = Date.now() - transitionRuntimeOffset;
  if (!(currentFrame?.data)) return;
  for (const pixel of currentFrame.data) {
    const prevPixel = getLEDState(pixel[0]);
    const [r, g, b] = getColorCode(prevPixel, pixel.slice(1), currentFrame.time, currentTransitionRuntime);
    led.showRGB(pixel[0], r, g, b);
    tempLEDMap[pixel[0]] = pixel.slice(1);
  }
  led.renderLED();

  // if -- frame++, prevState -> update
  const isCurrentTransitionCompleted = currentTransitionRuntime >= currentFrame.time;
  if (isCurrentTransitionCompleted) {
    currentFrameIndex += 1;
    currentFrameIndex = currentFrameIndex % frames.length // looping
    transitionRuntimeOffset = Date.now();
    currLEDMap = { ...tempLEDMap };
  }
  looper = setImmediate(() => runTransition(frames, currentFrameIndex));
}

const animate = async (frames) => {
  transitionRuntimeOffset = Date.now();
  runTransition(frames, currentFrameIndex);
}

exports.animationHanlder = async (payload) => {
  const data = payload.val();
  console.log(`Animation payload: ${JSON.stringify(data)}`)

  if (!('frames' in data)) {
    console.error('Incorrect payload. missing field frames');
    return;
  }

  tempLEDMap = {}
  clearImmediate(looper)
  animate(data.frames);
}
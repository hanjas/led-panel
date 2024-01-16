module.exports = {
  panelName: 'ledpanel-1',
  firebase: {
    rgbChannel: 'rtPixelData_ledpanel-1',
    animationChannel: '/animations_ledpanel-1/new-animation',
    relayChannel: '/testing-relay',
    configChannel: '/config/ledpanel-1',
    firebaseDatabaseURL: 'https://elixer-97dcc-default-rtdb.asia-southeast1.firebasedatabase.app',
    certFilePath: '../../connection.json'
  },
  led: {
    gpio: 21,
    ledCount: 210,
  }
}
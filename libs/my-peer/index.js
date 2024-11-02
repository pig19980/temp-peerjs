window = global;
var wrtc = require('wrtc');

RTCPeerConnection = wrtc.RTCPeerConnection;
RTCSessionDescription = wrtc.RTCSessionDescription;
RTCIceCandidate = wrtc.RTCIceCandidate;

WebSocket = require('ws');
location = {
  protocol: 'http',
};

var { Peer } = require('peerjs');

function getPeer() {
  const ret = new Peer();
  return ret;
}

module.exports = { getPeer };

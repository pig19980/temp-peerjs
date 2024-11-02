window = global;

XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

var wrtc = require('wrtc');

RTCPeerConnection = wrtc.RTCPeerConnection;
RTCSessionDescription = wrtc.RTCSessionDescription;
RTCIceCandidate = wrtc.RTCIceCandidate;

WebSocket = require('ws');
location = {
  protocol: 'http',
};

// var { Peer } = require('peerjs');

require('peerjs/lib/exports');
// function myPeer() {}

module.exports = function () {
  return new Peer();
};

import { Injectable } from '@nestjs/common';
import { XMLHttpRequest } from 'xmlhttprequest';
import * as wrtc from 'wrtc';
import * as WebSocket from 'ws';
import { Peer } from 'peerjs';

declare global {}

@Injectable()
export class MyPeerService {
  constructor() {
    window = global as Window & typeof globalThis;
    RTCPeerConnection = wrtc.RTCPeerConnection;
    RTCSessionDescription = wrtc.RTCSessionDescription;
    RTCIceCandidate = wrtc.RTCIceCandidate;
    location = {
      protocol: 'http',
    } as Location;
  }

  getPeer() {
    return new Peer();
  }
}

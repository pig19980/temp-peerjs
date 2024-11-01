import { BadGatewayException, Logger, Res, UseGuards } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { PeerDto } from './dto/join-room-request.dto';
import { initPeerSocket, PeerSocket } from './entities/PeerSocket';
const peerJs = require('peerjs-nodejs');

class User {
  userId: string;
}

@WebSocketGateway()
export class TcpConnectGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  peer;
  constructor() {
    console.log(window)
    this.peer = peerJs();
    // console.log(this.peer);
    this.peer.on('open', (id) => {
      console.log(id);
    });
  }

  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('TCPEventsGateway');

  @SubscribeMessage('join-room')
  handleJoinRoom(
    @ConnectedSocket() client: PeerSocket,
    @MessageBody() { roomId, userId }: PeerDto,
  ) {
    // Need check room is exist
    if (client.isInRoom()) {
      throw new BadGatewayException();
    }
    this.server.to(roomId).emit('user-connected', userId);
    client.joinRoom({ roomId, userId });
  }

  handleDisconnect(client: PeerSocket) {
    this.logger.log(`Client Disconnected : ${client.id}`);
    if (client.isInRoom()) {
      const { roomId, userId } = client.leaveRoom();
      this.server.to(roomId).emit('user-disconnected', userId);
    }
  }

  afterInit(server: Server) {
    this.logger.log('웹소켓 서버 초기화 ✅');
  }

  handleConnection(client: PeerSocket, ...args: any[]) {
    this.logger.log(`Client Connected : ${client.id}`);
    initPeerSocket(client);
  }
}

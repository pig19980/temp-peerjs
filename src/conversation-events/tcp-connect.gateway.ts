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
import { Server, Socket } from 'socket.io';
import { AuthWsGuard } from 'src/auth/auth.guard';
import { JoinRoomRequest } from './dto/join-room-request.dto';
import { ContextIdFactory } from '@nestjs/core';
import { error } from 'console';

class User {
  userId: string;
}

@WebSocketGateway()
export class TcpConnectGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor() {}

  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('TCPEventsGateway');

  @SubscribeMessage('join-room')
  handleJoinRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() { roomId, userId }: JoinRoomRequest,
  ) {
    // Need check room is exist
    if (client.roomId) {
      throw new BadGatewayException();
    }
    this.server.to(roomId).emit('user-connected', userId);
    client.join(roomId);
    client.roomId = roomId;
    client.userId = userId;
    console.log('add listen');
    console.log(client.roomId);
    console.log(client.id, userId);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client Disconnected : ${client.id}`);
    console.log('was in ', client.roomId);
    if (client.roomId) {
      this.server.to(client.roomId).emit('user-disconnected', client.userId);
    }
  }

  afterInit(server: Server) {
    this.logger.log('웹소켓 서버 초기화 ✅');
  }

  handleConnection(client: Socket, ...args: any[]) {
    console.log(client.handshake.query.token);
    this.logger.log(`Client Connected : ${client.id}`);
    client.roomId = undefined;
  }
}

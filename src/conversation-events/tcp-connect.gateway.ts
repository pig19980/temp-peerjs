import { Logger, Res, UseGuards } from '@nestjs/common';
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

@WebSocketGateway()
export class TcpConnectGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor() {}

  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('TCPEventsGateway');

  afterInit(server: Server) {
    this.logger.log('웹소켓 서버 초기화 ✅');
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client Disconnected : ${client.id}`);
    console.log(client.rooms);
  }

  handleConnection(client: Socket, ...args: any[]) {
    console.log(client.handshake.query.token);

    this.logger.log(`Client Connected : ${client.id}`);
    client.on('join-room', ({ roomId, userId }: JoinRoomRequest) => {
      console.log(userId, roomId);
      client.join(roomId);
      console.log('joined', client.rooms);
      this.server.to(roomId).emit('user-connected', userId);

      client.on('disconnect', () => {
        console.log(client.rooms);
        this.server.to(roomId).emit('user-disconnected', userId);
      });
    });
  }
}

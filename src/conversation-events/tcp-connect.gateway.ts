import { Logger, Res, UseGuards } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Response } from 'express';
import { AuthHttpGuard, AuthWsGuard } from 'src/auth/auth.guard';

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
  }

  handleConnection(client: Socket, ...args: any[]) {
    console.log(args);
    console.log(client.rooms);
    console.log(client.id);
    console.log(client.rooms);
    console.log(client.handshake.query.token);

    this.logger.log(`Client Connected : ${client.id}`);
  }
}

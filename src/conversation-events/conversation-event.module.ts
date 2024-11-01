import { Module } from '@nestjs/common';
import { TcpConnectGateway } from './tcp-connect.gateway';

@Module({
  providers: [TcpConnectGateway],
})
export class ConversationEventsModule {}

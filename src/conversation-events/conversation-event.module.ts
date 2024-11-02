import { Module } from '@nestjs/common';
import { TcpConnectGateway } from './tcp-connect.gateway';

@Module({
  imports: [],
  providers: [TcpConnectGateway],
})
export class ConversationEventsModule {}

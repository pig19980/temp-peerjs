import { Module } from '@nestjs/common';
import { TcpConnectGateway } from './tcp-connect.gateway';
import { MyPeerModule } from '@app/my-peer';

@Module({
  imports: [MyPeerModule],
  providers: [TcpConnectGateway],
})
export class ConversationEventsModule {}

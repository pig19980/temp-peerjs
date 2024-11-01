import { Module } from '@nestjs/common';
import { MyPeerService } from './my-peer.service';

@Module({
  providers: [MyPeerService],
  exports: [MyPeerService],
})
export class MyPeerModule {}

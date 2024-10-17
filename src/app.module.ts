import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConversationEventModule } from './conversation-event/conversation-event.module';

@Module({
  imports: [ConversationEventModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

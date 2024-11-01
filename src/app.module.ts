import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConversationEventsModule } from './conversation-events/conversation-event.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ConversationEventsModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

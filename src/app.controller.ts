import { Controller, Get, Param, Redirect, Render } from '@nestjs/common';
import { AppService } from './app.service';
import { v4 as uuidv4 } from 'uuid';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Redirect()
  redirectToUUID() {
    const newUUID = uuidv4();
    return { url: `/${newUUID}` };
  }

  @Get(':room')
  @Render('index')
  getRoom(@Param('room') roomId: string) {
    return { roomId };
  }
}

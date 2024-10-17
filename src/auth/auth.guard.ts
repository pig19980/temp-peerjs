import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { Response } from 'express';

@Injectable()
export class AuthHttpGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    console.log('1=====================');
    const request: Request = context.switchToHttp().getRequest();
    const response: Response = context.switchToHttp().getResponse();
    console.log(request.cookies);
    response.user = '123';
    console.log(response);
    console.log(response.user);
    return true;
  }
}

@Injectable()
export class AuthWsGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    console.log('2=====================');
    const data = context.switchToWs().getData();
    console.log(data);
    return true;
  }
}

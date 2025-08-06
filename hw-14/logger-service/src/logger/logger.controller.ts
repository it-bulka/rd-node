import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('logger')
export class LoggerController {
  @MessagePattern('events.notifications')
  handleNotification(@Payload() msg: any) {
    console.log('LoggerService received event:', msg.value);
  }
}

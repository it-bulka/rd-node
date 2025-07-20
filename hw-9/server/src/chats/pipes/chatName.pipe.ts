import { ArgumentMetadata, BadRequestException, PipeTransform, Injectable } from '@nestjs/common';
import { ChatBodyDTO } from '../dto';

@Injectable()
export class ChatNamePipe implements PipeTransform {
  transform(value: ChatBodyDTO, metadata: ArgumentMetadata): any {
    if(metadata.type !== 'body') return value

    const { name, members } = value
    /*if(!name && members.length > 2) throw new BadRequestException('Require chat name for more then 2 members')
    if(!name && members.length < 2) throw new BadRequestException('Require chat name for less then 2 members')
*/
    return value
  }
}
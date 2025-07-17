import { BaseDBModule } from './base';
import { UserDTO } from '@/dto';
import { MODELS_PATHS } from '@/store/consts';

export class UsersModel extends BaseDBModule<UserDTO> {
  constructor() {
    super(MODELS_PATHS.users);
  }
}

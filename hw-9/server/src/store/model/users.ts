import { BaseDBModule } from './base';
import { UserDTO } from '@/dto';
import { MODELS_PATHS } from '@/store/consts';

export class UsersModel extends BaseDBModule<UserDTO> {
  constructor() {
    super(MODELS_PATHS.users);
  }

  async getOneByName(name: string): Promise<UserDTO | undefined> {
    const all = await this.getAll()
    return all.find(user => user.name === name)
  }
}

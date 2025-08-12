import * as path from 'path';
import { Injectable, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Store } from '@/store/store.service';
import { UserDTO, EnvDto } from '@/dto';
import { ensureUsersIconsDirExists } from './utils/ensureUsersIconsDirExists';
import { saveFile } from '@/utils';
import { DEFAULT_USER_AVATAR } from '@/consts';

@Injectable()
export class UsersService {
  constructor(
    private readonly store: Store,
    private readonly configService: ConfigService<EnvDto>
  ) {}

  async storeUser({ name, iconUrl }: Omit<UserDTO, 'id'>) {
    return this.store.users.createOne({ name, iconUrl });
  }

  async storeUserIcon(file: Express.Multer.File): Promise<string> {
    try {
      const { publicDir, storageDir } = await ensureUsersIconsDirExists()

      const ext = path.extname(file.originalname);
      const uniq_filename = Date.now().toString() + ext;

      await saveFile(storageDir, uniq_filename, file.buffer)

      return `/${publicDir}/${uniq_filename}`
    } catch (e) {
      console.log('Failed to store user icon: ',e)
      throw new BadRequestException('Failed to store user icon', { cause: e });
    }

  }

  async getUserIconLink(id: string): Promise<string> {
    const user = await this.store.users.getOne(id)
    if (!user) {
      throw new BadRequestException('No user found with id ' + id);
    }
    return user.iconUrl || DEFAULT_USER_AVATAR
  }

  async getAllUsers(): Promise<UserDTO[]> {
    return this.store.users.getAll()
  }
}

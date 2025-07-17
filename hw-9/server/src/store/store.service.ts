import { Injectable, OnModuleInit } from '@nestjs/common';
import { ensureFileExists, ensureDirExists } from '@/utils';
import { DB_DIR_PATH, MODELS_PATHS } from '@/store/consts';
import { UsersModel } from '@/store/model/users';
import { ChatsModel } from '@/store/model/chats';
import { MessegesModel } from '@/store/model/messeges';

@Injectable()
export class Store implements OnModuleInit {
  readonly users: UsersModel
  readonly chats: ChatsModel
  readonly messages: MessegesModel

  constructor() {
    this.users = new UsersModel()
    this.chats = new ChatsModel()
    this.messages = new MessegesModel()
  }
  async onModuleInit() {
    await this.#ensureStoreExists()
  }

  async #ensureStoreExists() {
    await ensureDirExists(DB_DIR_PATH)

    const dbFiles = Object.values(MODELS_PATHS)
    await Promise.all(dbFiles.map(filePath => ensureFileExists(filePath, '[]')))
  }
}
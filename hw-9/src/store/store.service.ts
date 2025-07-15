import { Injectable, OnModuleInit } from '@nestjs/common';
import { ensureFileExists, ensureDirExists } from '@/utils';
import { DB_DIR_PATH, MODELS_PATHS } from '@/store/consts';
import { UsersModel } from '@/store/model/users';
import { ChatsModel } from '@/store/model/chats';

@Injectable()
export class Store implements OnModuleInit {
  readonly users: UsersModel
  readonly chats: ChatsModel

  constructor() {
    this.users = new UsersModel()
    this.chats = new ChatsModel()
  }
  async onModuleInit() {
    await this.#ensureStoreExists()
  }

  async #ensureStoreExists() {
    await ensureDirExists(DB_DIR_PATH)
    await ensureFileExists(MODELS_PATHS.users, '[]')
    await ensureFileExists(MODELS_PATHS.chats, '[]')
  }
}
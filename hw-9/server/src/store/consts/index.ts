import  * as path from 'path'

export const DB_DIR_PATH = path.resolve(__dirname, '..', 'db')

export const MODELS_PATHS = {
  users: path.resolve(DB_DIR_PATH, 'users.json'),
  chats: path.resolve(DB_DIR_PATH, 'chats.json'),
  messages: path.resolve(DB_DIR_PATH, 'messages.json'),
}
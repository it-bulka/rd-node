import { ensureDirExists } from '@/utils';
import  * as path from 'path';
import { STATIC_FOLDER_NAME, ICONS_FOLDER_NAME, STATIC_FOLDER_PREFIX } from '@/consts';

export const USERS_ICONS_PATH = path.resolve(__dirname, '..', '..', '..', STATIC_FOLDER_NAME, ICONS_FOLDER_NAME) // app/public/icons

export const ensureUsersIconsDirExists = () =>
  ensureDirExists(USERS_ICONS_PATH)
    .then(() => ({
      storageDir: USERS_ICONS_PATH,
      publicDir: `${STATIC_FOLDER_PREFIX}/${ICONS_FOLDER_NAME}`
    }))

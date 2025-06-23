import path from 'node:path'
import url from 'node:url'

const __fileName = url.fileURLToPath(import.meta.url)
const __dirname = path.dirname(__fileName)
export const routesDir = path.join(__dirname, '..', 'routes')
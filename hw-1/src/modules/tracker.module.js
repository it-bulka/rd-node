import { writeFile, readFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { randomUUID } from 'node:crypto'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const DB = join(__dirname, '..', '..', 'database.json')

const read = async () => {
  const file = await readFile(DB, 'utf8')
  return file.trim() ? JSON.parse(file) : []
}

const save = async (data) => {
  await writeFile(DB, JSON.stringify(data, null, 2), 'utf8')
}

export const addItem = async (data) => {
  const id = randomUUID()
  const item = { id, ...data }
  const dbContent = await read()
  dbContent.push(item)

  await save(dbContent)
  return item
}

export const getById = async (id) => {
  const db = await read()
  return db.find((u) => u.id === id)
}

export const updateById = async (id, payload) => {
  const db = await read()
  const idx = db.findIndex((u) => u.id === id)
  if (idx === -1) return null
  db[idx] = { ...db[idx], ...payload }
  await save(db)

  return db[idx]
}

export const deleteById = async (id) => {
  const db = await read()
  const rest = db.filter((u) => u.id !== id)
  if (rest.length === db.length) return null
  await save(rest)

  return true
}

export const getMany = async () => {
  return await read()
}
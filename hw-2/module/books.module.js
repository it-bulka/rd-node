import fs from 'node:fs/promises'
import path from 'node:path'
import url from 'node:url'
import crypto from 'node:crypto'

const __filename = url.fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const DB = path.join(__dirname, '..', 'db.json')

const read = async () => {
  const file = await fs.readFile(DB, 'utf8')

  let content = file.trim() !== '' ? JSON.parse(file) : []
  if (!Array.isArray(content)) {
    content = []
  }

  return content
}

const save = async (data) => {
  await fs.writeFile(DB, JSON.stringify(data, null, 2), 'utf8')
}

export const createOne = async (data) => {
  const item = {
    ...data,
    id: crypto.randomUUID()
  }
  const db = await read()
  db.push(item)
  await save(db)
  return item
}

export const getOne = async (id) => {
  const db = await read()
  const item = db.find((item) => item.id === id)
  return item
}

export const getAll = async () => {
  return await read()
}

export const deleteOne = async (id) => {
  const db = await read()
  const deletedItem = db.find((item) => item.id === id)
  const content = db.filter((item) => item.id !== id)
  await save(content)
  return deletedItem
}

export const deleteAll = async () => {
  await save([])
}

export const updateOne = async (id, dataToUpdate) => {
  const db = await read()
  const content = db.map((item) => {
    if (item.id === id) {
      return {
        ...item,
        ...dataToUpdate
      }
    }

    return item
  })

  await save(content)
}
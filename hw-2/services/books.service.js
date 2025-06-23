import { getOne, deleteOne, updateOne, deleteAll, createOne, getAll } from "../module/books.module.js"

export const createBook = async (fields) => createOne(fields)
export const getBookById = async (id) => getOne(id)
export const getAllBooks = async () => getAll()
export const deleteBookById = async (id) => deleteOne(id)
export const deleteAllBooks = async () => deleteAll()
export const updateBookById = async (id, fieldsToUpdate) => updateOne(id, fieldsToUpdate)
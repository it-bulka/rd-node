import { getBookById, deleteBookById } from "../../../services/books.service.js"
export const GET = async (req, res) => {
  const { id } = req.params
  if(!id) return res.answer(404, {
    success: true,
    message: 'Book ID should be provided',
  })

  const book = await getBookById(id)
  if(!book) return res.answer(400, {
    success: true,
    message: 'Book Not Found',
  })

  return res.answer(200, {
    success: true,
    book
  })
}

export const DELETE = async (req, res) => {
  const { id } = req.params
  if(!id) return res.answer(404, {
    success: true,
    message: 'Book ID should be provided',
  })

  const book = await deleteBookById(id)
  if(!book) return res.answer(400, {
    success: true,
    message: 'Book Not Found',
  })

  return res.answer(200, {
    success: true,
    message: 'Book deleted successfully',
    deletedBook: book
  })
}
import { createBook, getAllBooks } from "../../services/books.service.js"

export const POST = async (req, res) => {
  const { title, author } = req.body
  if (!title || !author) {
    return res.answer(404, {
      success: false,
      error: "Both title and author fields should be provided"
    })
  }

  if(typeof title !== 'string') {
    return res.answer(404, {
      success: false,
      error: "Field title should be a string type"
    })
  }

  if(typeof author !== 'string') {
    return res.answer(404, {
      success: false,
      error: "Field author should be a string type"
    })
  }

  const book = await createBook(req.body)
  return res.answer(201, {
    success: false,
    message: "Book created successfully",
    book
  })
}

export const GET = async (req, res) => {
  const books = await getAllBooks()
  return res.answer(200, {
    success: true,
    books
  })
}
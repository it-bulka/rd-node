import { createBook, getAllBooks } from "../../services/books.service.js"

export const POST = async (req, res) => {
  const { title, author }  = req.body
  if (!title || !author) {
    return res.answer(404, {
      success: false,
      error: "Both Title and Author fields should be provided"
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
export const notFound = async (req, res, next) => {
  res.status(404).json({
    success: false,
    error: 'Route Not Found'
  })
  next()
}
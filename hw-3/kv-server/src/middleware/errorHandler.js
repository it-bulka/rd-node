export const errorHandler = async (err, req, res, _next) => {
  res.status(err.status || 400).json({
    message: err.message || 'Internal Server Error'
  })
}
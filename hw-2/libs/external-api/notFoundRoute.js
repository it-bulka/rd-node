export const notFoundRoute = async (req, res) => {
  const data = JSON.stringify({
    success: false,
    error: 'Route Not Found',
  })

  res.setHeader('Content-Type', 'application/json')
  res.statusCode = 404
  res.write(data)
  return res.end()
}
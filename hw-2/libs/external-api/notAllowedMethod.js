export const notAllowedMethod = async (res) => {
  const data = JSON.stringify({
    success: false,
    error: 'Method Not Allowed',
  })

  res.setHeader('Content-Type', 'application/json')
  res.statusCode = 405
  res.write(data)
  return res.end()
}
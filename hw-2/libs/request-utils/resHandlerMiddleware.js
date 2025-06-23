export const resHandlerMiddleware = (res) => {
  res.answer = (statusCode, dataToSend) => {
    res.setHeader('Content-Type', 'application/json')
    res.statusCode = statusCode
    res.write(JSON.stringify(dataToSend))
    return res.end()
  }
}
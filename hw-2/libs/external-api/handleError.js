export const handlerError = async (req, res, innerFileRoutes, reqHandler) => {
  try {
    return await reqHandler(req, res, innerFileRoutes)
  } catch (err) {
    console.error(err.stack)

    const data = JSON.stringify({
      success: false,
      message: 'Internal Server Error',
    })

    res.statusCode = 500
    res.write(data)
    return res.end()
  }
}
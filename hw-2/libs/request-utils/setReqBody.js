const getRequestBody = async (req) => {
  return new Promise((resolve, reject) => {
    let body = ''

    req.on('data', chunk => {
      body += chunk
    })

    req.on('end', () => {
      try {
        if (!body) return resolve(null)

        const parsed = JSON.parse(body)
        resolve(parsed)
      } catch (err) {
        console.log('ERROR at getRequestBody: ', err)
        reject(new Error('Invalid JSON'))
      }
    })

    req.on('error', reject)
  })
}

export const setReqBody = async (req) => {
  const body = await getRequestBody(req)
  if(!body) {
    req.body = {}
    return
  }
  req.body = body
}

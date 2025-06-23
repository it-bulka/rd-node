export const setReqPathnameAndQuery = (req) => {
  const [url, searchParams] = req.url.split('?')

  req.query = searchParams
  req.pathname = url
}
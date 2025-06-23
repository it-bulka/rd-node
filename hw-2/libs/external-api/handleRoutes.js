import { setReqPathnameAndQuery } from "../file-routing/index.js"
import { handleRoute } from "./handleRoute.js"
import { notFoundRoute } from "./notFoundRoute.js"
import { resHandlerMiddleware } from "../request-utils/resHandlerMiddleware.js"
import { setReqBody } from "../request-utils/setReqBody.js"

export const handleRoutes = async (req, res, innerFileRoutes) => {
  let isReqRouteHandled = false
  setReqPathnameAndQuery(req)
  resHandlerMiddleware(res)
  await setReqBody(req)
  console.log('req', req.url, req.method)

  for (const route of innerFileRoutes) {
    isReqRouteHandled = await handleRoute(req, res, route)
    if (isReqRouteHandled) break
  }

  if(!isReqRouteHandled) {
    return await notFoundRoute(req, res)
  }
}
import { setReqParams } from "../file-routing/index.js"
import { notAllowedMethod } from "./notAllowedMethod.js"

export const handleRoute = async (req, res, route) => {
  const match = route.routeTemplate.exec(req.pathname)
  if (!match) return false
  setReqParams(req, match)

  const method = route.methods[req.method]
  if(!method) {
    return await notAllowedMethod(res)
  }

  await method(req, res)
  return true
}
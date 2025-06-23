import fs from 'node:fs/promises'
import path from 'node:path'
import { routesDir } from '../../consts/consts.js'
import { getMethods } from "./getMethods.js"
import { getRouteUrl } from "./getRouteUrl.js"
import { getRouteTemplate } from "./getRouteTemplate.js"

const pattern = /route\.(js|ts)$/

const isRoute = (filePath) => filePath.match(pattern)

const traverseDir = async (dir, cb) => {
  const files = await fs.readdir(dir)

  for (const file of files) {
    const filePath = path.join(dir, file)
    const stat = await fs.stat(filePath)

    if(stat.isDirectory()) {
      await traverseDir(filePath, cb)
    } else {
      await cb(filePath)
    }
  }
}

const routes = []

const composeRoutesMap = async (filePath) => {
  const isRouteFile = isRoute(filePath)

  if(!isRouteFile) return

  const { path: urlPath, segments } = getRouteUrl(filePath)
  const routeTemplate = getRouteTemplate(segments)
  const methodsData = await getMethods(filePath)

  routes.push({
    route: urlPath,
    routeTemplate,
    methods: methodsData
  })

  return routes
}

export const getRoutes = async () => {
  await traverseDir(routesDir, composeRoutesMap)
  return routes
}
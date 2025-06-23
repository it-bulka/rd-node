import path from 'node:path'
import { routesDir } from '../../consts/consts.js'

export const getRouteUrl = (fullFilePath) => {
  const filePathWithoutRoutesDir = fullFilePath.replace(routesDir, '')
  const fileSegments = filePathWithoutRoutesDir.split(path.sep)
  const startIndex = fileSegments[0] === '' ? 1 : 0

  const urlSegments = fileSegments.slice(startIndex, fileSegments.length - 1)

  return {
    path: urlSegments.join('/'),
    segments: urlSegments[0] === '' ? urlSegments.slice(1) : urlSegments,
  }
}
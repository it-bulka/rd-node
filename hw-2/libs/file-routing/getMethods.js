import url from 'node:url'

const acceptedMethods = new Set([
  'GET', 'POST', 'PUT', 'PATCH', 'DELETE'
])

const isAcceptedMethod = (methodName, method) => {
    return typeof method === 'function' && acceptedMethods.has(methodName)
}

export const getMethods = async (filePath) => {
  const exportedData = await import(url.pathToFileURL(filePath).href)
  const methodsMap = {}

  for (const key in exportedData) {
    const isMethod = isAcceptedMethod(key, exportedData[key])
    if (!isMethod) continue
    methodsMap[key] = exportedData[key]
  }

  return methodsMap
}
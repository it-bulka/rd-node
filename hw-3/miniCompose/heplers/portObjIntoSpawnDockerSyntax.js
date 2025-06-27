export const portObjIntoSpawnDockerSyntax = (portObj) => {
  if(!portObj) return []

  const [key, value] = Object.entries(portObj)[0]

  return ['-p', `${key}:${value}`]
}
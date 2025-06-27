export const volumesObjIntoSpawnDockerSyntax = (volumesObj) => {
  const volumes = []
  if(!volumesObj) return volumes

  for (const [key, value] of Object.entries(volumesObj)) {
    volumes.push('-e', `${key}=${value}`)
  }
  return volumes
}
export const envObjIntoSpawnDockerSyntax = (envObj) => {
  const env = []
  if(!envObj) return env

  for (const [key, value] of Object.entries(envObj)) {
    env.push('-e', `${key}=${value}`)
  }
  return env
}
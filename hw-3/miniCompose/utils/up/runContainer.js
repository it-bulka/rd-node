import { runCommand } from "../runCommand.js"
import { envObjIntoSpawnDockerSyntax } from "../../heplers/envObjIntoSpawnDockerSyntax.js"
import { portObjIntoSpawnDockerSyntax } from "../../heplers/portObjIntoSpawnDockerSyntax.js"
import { volumesObjIntoSpawnDockerSyntax } from "../../heplers/volumesObjIntoSpawnDockerSyntax.js"

export const runContainer = ({ containerName, imageTitle, network, portObj, envsObj, volumesObj }) => {
  const port = portObjIntoSpawnDockerSyntax(portObj)
  const envs = envObjIntoSpawnDockerSyntax(envsObj)
  const volumes = volumesObjIntoSpawnDockerSyntax(volumesObj)

  return runCommand(
    'docker',
    [
      'run', '-d', '--name', containerName,
      '--network', network,
      ...port,
      ...envs,
      ...volumes,
      imageTitle
    ]
  )
}
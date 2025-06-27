import { runCommand } from "../runCommand.js"

export const removeContainer = async (containerName) => {
  await runCommand('docker', ['stop', containerName])
  await runCommand('docker', ['rm', containerName])
}
export const removeContainers = async (containersObj, network) => {
  const containersNames = Object.keys(containersObj)
  await Promise.allSettled(containersNames.map((container) => removeContainer(container)))
  await runCommand('docker', ['network', 'rm', network])
}
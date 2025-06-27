import { runCommand } from "../runCommand.js"

export const buildContainer = async (containerName, context, dockerfile) => {
  const imageTitle = `${containerName}:local`
  const dockerFileOption = dockerfile ? ['-f', dockerfile] : []
  await runCommand('docker', ['build', '-t', imageTitle, ...dockerFileOption, context])

  return imageTitle
}
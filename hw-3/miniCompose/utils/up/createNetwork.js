import { runCommand } from "../runCommand.js"

export const createNetwork = async (networkName) => {
  try {
    await runCommand('docker', ['network', 'inspect', networkName])
    console.log(`Network "${networkName}" already exists.`)
  } catch {
    await runCommand('docker', ['network', 'create', '--driver', 'bridge', networkName])
    console.log(`Network "${networkName}" created.`)
  }
}
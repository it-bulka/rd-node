import { runCommand } from "./runCommand.js"

export const  streamLogs = (containerName) => {
  return runCommand('docker', ['logs', '-f', containerName])
}
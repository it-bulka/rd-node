import { removeContainers } from "./removeContainers.js"

export const shutdownListening = (containers, network) => {
  process.on('SIGINT', async () => {
    console.info('ATTENTION! Run command "npm run down" for removing containers')

    // NOT run async code
    await removeContainers(containers, network)
    console.log('Servers removed successfully.')
  })
}
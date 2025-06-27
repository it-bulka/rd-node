import { removeContainers } from "./utils/down/removeContainers.js"

export const down = async (config) => {
  console.log('Wait! Removing containers...')

  await removeContainers(config.services, config.network)

  console.log('Servers removed successfully.')
  process.exit(0)
}
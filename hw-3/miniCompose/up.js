import { createNetwork } from "./utils/up/createNetwork.js"
import { runServicesTopologically } from "./utils/up/runServicesTopologically.js"

export const up = async (config) => {
  await createNetwork(config.network)
  await runServicesTopologically(config.services, config.network)
}
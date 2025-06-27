import { topologicalSort } from "../../heplers/topologicalSort.js"
import { buildContainer } from "./buildContainer.js"
import { runContainer } from "./runContainer.js"
import { streamLogs } from "../streamLogs.js"
import { createNetwork } from "./createNetwork.js"
import { getContext } from "./getContext.js"
import { waitUntilContainerIsRunning } from "./waitUntilContainerIsRunning.js"

async function runSequentially(tasks) {
  for (const task of tasks) {
    await task()
  }
}

async function runTask(serviceName, services, network) {
  const service = serviceName
  const { context, dockerfile} = getContext(services[service].build)

  await createNetwork(network)
  const imageTitle = await buildContainer(service, context, dockerfile)

  const runContainerArgs = {
    containerName: service,
    imageTitle,
    network,
    portObj: services[service].ports,
    envsObj: services[service].env,
    volumesObj: services[service].volumes
  }
  await runContainer(runContainerArgs)

  streamLogs(service)
}

export const runServicesTopologically = async (servicesObj, network) => {
  const sorted = topologicalSort(servicesObj)

  const tasks = sorted.map(service => () => runTask(service, servicesObj, network))
  await runSequentially(tasks)
}
import { exec } from 'child_process'

export const waitUntilContainerIsRunning = (containerName) => {
  return new Promise((resolve, reject) => {
    const interval = setInterval(() => {
      exec(`docker inspect -f '{{.State.Running}}' ${containerName}`, (err, stdout) => {
        if (err) {
          clearInterval(interval)
          reject(new Error(`Container ${containerName} not found`))
        }

        if (stdout.trim() === 'true') {
          clearInterval(interval)
          resolve()
        }
      })
    }, 300)
  })
}

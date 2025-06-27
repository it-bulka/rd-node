import { spawn } from 'child_process'

export const runCommand = async (command, args = []) => {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { stdio: 'inherit' })

    child.on('close', (code) => {
      if (code === 0) resolve()
      else reject(new Error(`${command} ${args.join(' ')} failed with code ${code}`));
    })
  })
}
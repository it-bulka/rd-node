import { printErrorAndExit } from './errors.js'

const getFlagsOptions = (args) => {
  const options = {}

  for (let i = 0; i < args.length; i++) {
    if(args[i].startsWith('--')) {
      const option = args[i].replace('--', '')
      const value = args[i + 1]
      options[option] = value
    }
    i++
  }

  return options
}

export const getCommand = (commandsMap) => {
  const args = process.argv.slice(2)
  const [command, ...rest] = args

  if (!command) {
    printErrorAndExit('You need to provide a command')
  }

  if(!commandsMap[command]) {
    printErrorAndExit('Provided command does not exist')
  }

  const options = getFlagsOptions(rest)

  return {
    command,
    options
  }
}
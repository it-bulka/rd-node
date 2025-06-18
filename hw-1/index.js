import { getCommand } from './src/utils/getCommand.js'
import { errorHandler } from './src/utils/errorHandler.js'
import {
  addHabit,
  getHabitList,
  setHabitDone,
  getHabitStats,
  deleteHabit,
  updateHabit
} from './src/controllers/tracker.controller.js'

export const commandsMap = {
  add: addHabit,
  list: getHabitList,
  done: setHabitDone,
  stats: getHabitStats,
  delete: deleteHabit,
  update: updateHabit
}

const createMockServer = async () => {
  const { command, options } = getCommand(commandsMap)
  const fn = commandsMap[command]
  await fn(options)
}

errorHandler(createMockServer)
  .catch(err => console.log(err))

process.on('unhandledRejection', (reason, promise) => {
  console.error(`Unhandled Rejection at ${promise}, "reason": ${reason}`)
})
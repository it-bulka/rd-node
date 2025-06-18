import * as service from '../services/tracker.service.js'
import {
  validateAddingHabit,
  validateDeleteHabit,
  validateSetHabitDone,
  validateUpdatingHabit
} from "../utils/validate.js"
import { printErrorAndExit, printSuccess } from "../utils/errors.js"

export const addHabit = async (input) => {
  const {
    error, value
  } = validateAddingHabit(input)

  if(error) {
    printErrorAndExit('Invalid inputs:\n', error)
  }

  await service.addHabit(value)
  printSuccess('Habit added successfully.');
}

export const getHabitList = async () => {
  const list = await service.getHabitList()
  if(list.length === 0) {
    printSuccess('No habits found.')
  }
  console.table(list);
}

export const setHabitDone = async (input) => {
  const { error, value} = validateSetHabitDone(input)
  if(error) {
    printErrorAndExit('Invalid input:\n', error)
  }
  await service.setHabitDone(value.id)
  printSuccess('Habit marked done successfully.');
}

export const getHabitStats = async () => {
  const stats = await service.getHabitStats()

  if(stats.length === 0) {
    printSuccess('No habits found.')
  }

  stats.map(({stats, createdAt, name, id }) => {
    console.log(`Statistics of Habit "${name}": \n(id: ${id}, createdAt: ${createdAt})`)
    console.table(stats)
  })
}

export const deleteHabit = async (input) => {
  const {error, value} = validateDeleteHabit(input)
  if(error) {
    printErrorAndExit('Invalid input:\n', error)
  }

  const isDeleted = await service.deleteHabit(input.id)
  if(!isDeleted) {
    printErrorAndExit(`Impossible to delete. Habit with id "${value.id}" not found`)
  }
  printSuccess(`Habit "${value.id}" deleted successfully.`);
}

export const updateHabit = async (input) => {
  const { error, value} = validateUpdatingHabit(input)
  if(error) {
    printErrorAndExit('Invalid input:\n', error)
  }
  const updated = await service.updateHabit(value)
  printSuccess('Habit updated successfully.', "post", updated)
}
import {
  addItem, deleteById,
  getById,
  getMany, updateById
} from '../modules/tracker.module.js'
import { printErrorAndExit } from "../utils/errors.js"
import { now } from "../utils/date.js"
import {
  getPeriodsParams,
  getStatsData
} from "../utils/stats.js";

export const addHabit = async ({ name, freq }) => {
  const item = {
    name,
    frequency: freq,
    createdAt: now(),
    doneDates: []
  }
  return await addItem(item)
}

export const getHabitList = async () => {
  return (await getMany())
    .map((item) => {
      const {doneDates, ...rest} = item

      return {
      ...rest,
        createdAt: new Date(rest.createdAt).toLocaleString(),
        doneCounts: doneDates.length
      }
    })
}

export const setHabitDone = async (id) => {
  const habit = await getById(id)
  if(!habit) {
    printErrorAndExit(`Habit with id ${id} not found`)
  }

  const { createdAt, doneDates } = habit
  const doneDate = now()

  if(doneDate < createdAt) {
    printErrorAndExit(`Attempt to mark habit as done with a date earlier than creation date.`)
  }

  const updatedDoneDates = [...doneDates, doneDate]

  await updateById(id, { doneDates: updatedDoneDates })
}

//TODO:
export const getHabitStats = async () => {
  const allItems = await getMany()

  const today = now()
  const statsParams = getPeriodsParams(today)

  return allItems
    .map((item) => {

      const statsData = getStatsData({
        statsParams,
        item,
        endDay: today
      })

      return {
        id: item.id,
        name: item.name,
        frequency: item.frequency,
        createdAt: new Date(item.createdAt).toLocaleString(),
        stats: statsData
      }
    })
}

export const deleteHabit = async (id) => {
  return deleteById(id)
}

export const updateHabit = async ({id, name, freq}) => {
  const payload = {}
  if(name) {
    payload.name = name
  }
  if(freq) {
    payload.frequency = freq
  }

  return await updateById(id, payload)
}
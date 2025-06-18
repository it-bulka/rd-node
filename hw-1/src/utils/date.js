export const now = () => {
  const DAY_OFFSET = process.env.DAY_OFFSET
  const offsetDays = DAY_OFFSET === 'none' ? 0 : Number(DAY_OFFSET || 0)

  return Date.now() + offsetDays * 24 * 60 * 60 * 1000;
}

export const setStartOfDay = (ms) => {
  const date = new Date(ms)
  date.setHours(0,0,0,0)
  return date.getTime()
}

export const setEndOfDay = (ms) => {
  const date = new Date(ms)
  date.setHours(0,0,0,0)
  date.setDate(date.getDate() + 1) //next day
  return date.getTime() - 1 //minus 1 sec from next day
}
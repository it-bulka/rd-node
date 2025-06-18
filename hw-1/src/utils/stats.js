import { setStartOfDay } from "./date.js";

const statsPeriods = [7, 30]
export const statsFreq = {
  daily: 1,
  weekly: 7,
  monthly: 30,
}

export const getStatsStartDayTime = ({ period, endDay }) => {
  const lastPeriod = (period - 1) * 24 * 60 * 60 * 1000; // - 1 because today included
  const startDay = endDay - lastPeriod
  const startDayTime = setStartOfDay(startDay)

  return startDayTime
}

export const getPeriodsParams = (endDay) => {
  return statsPeriods.map((period) => {
    const startDayTime = getStatsStartDayTime({ period, endDay })

    return {
      period,
      startDayTime,
    }
  })
}

export const calculateShouldBeDoneAmount = ({ period, freq}) => {
  return Math.ceil(period / statsFreq[freq])
}
export const calculatePercentage = ({ doneAmount, shouldBeDone }) => {
  return Math.round((doneAmount / shouldBeDone) * 100 * 100) / 100
}

export const getStatsData = ({ statsParams, item, endDay }) => {
  return statsParams.map(param => {
    const { period, startDayTime } = param

    const doneDatesDuringPeriod = item.doneDates.filter(d => d >= startDayTime)
    const shouldBeDone = calculateShouldBeDoneAmount({ period, freq: item.frequency })
    const percentage = calculatePercentage({
      doneAmount: doneDatesDuringPeriod.length,
      shouldBeDone
    })

    return  {
      frequency: item.frequency,
      period: `${period} days`,
      startDay: new Date(startDayTime).toLocaleDateString(),
      lastDay: new Date(endDay).toLocaleDateString(),
      'done times': doneDatesDuringPeriod.length,
      'should be done': shouldBeDone,
      'done %': `${percentage} %`,
    }
  })
}
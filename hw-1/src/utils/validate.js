const validFraq = ['daily', 'weekly', 'monthly']

const validate = (condition, errors, errorMsg) => {
  if(condition) {
    errors.push(errorMsg)
  }
}
const validations = {
  checkName: (errors, name) => validate(
    typeof name !== "string" || name?.trim() === "",
    errors,
    'Habit name is required: --name "<habit text>"'
  ),
  checkNameEmpty: (errors, name) => validate(
    name && name?.trim() === "",
    errors,
    'Habit name could not be empty: --name "<habit text>"'
  ),
  checkFreqExisting: (errors, freq) => validate(
    !freq,
    errors,
    'Habit freq is required: --freq <daily|weekly|monthly>'
  ),
  checkFreqOptions: (errors, freq) => validate(
    freq && !validFraq.includes(freq),
    errors,
    'Incorrect value for freq. Provide correct value: --freq <daily|weekly|monthly>'
  ),
  checkNameOrFreqExisting: (errors, name, freq) => validate(
    !name?.trim() && !freq,
    errors,
    'Options "freq", "name" or both are requires to update'
  ),
  checkId: (errors, id) => validate(
    typeof id !== "string" || id?.trim() === "",
    errors,
    'Habit id is required: --id "<id>"'
  )
}

export const validateAddingHabit = (input) => {
  const errors = []

  validations.checkName(errors, input.name)
  validations.checkFreqExisting(errors, input.freq)
  validations.checkFreqOptions(errors, input.freq)

  return {
    isValid : errors.length > 0,
    error: errors.join('\n'),
    value: { freq : input?.freq, name : input.name?.trim() }
  }
}

export const validateSetHabitDone = (input) => {
  const errors = []
  const id = input.id
  validations.checkId(errors, id)

  return {
    isValid : errors.length > 0,
    error: errors.join('\n'),
    value: { id : id?.trim() }
  }
}

export const validateDeleteHabit = (input) => {
  const errors = []
  const id = input.id
  validations.checkId(errors, id)

  return {
    isValid : errors.length > 0,
    error: errors.join('\n'),
    value: { id : id?.trim() }
  }
}

export const validateUpdatingHabit = (input) => {
  const errors = []
  const { id, freq, name } = input

  validations.checkId(errors, id)
  validations.checkNameOrFreqExisting(errors, name, freq)
  validations.checkNameEmpty(errors, name)
  validations.checkFreqOptions(errors, freq)

  return {
    isValid : errors.length > 0,
    error: errors.join('\n'),
    value: { id : id?.trim() }
  }
}

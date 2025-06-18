export function printErrorAndExit(...message) {
  console.error('\x1b[31m%s\x1b[0m', 'ERROR')
  console.log(...message)
  process.exit(0)
}

export function printSuccess(...message) {
  console.log('\x1b[32m')
  console.log(...message)
  process.exit(1)
}
export const errorHandler = async (cb) => {
  try {
    await cb();
  } catch (error) {
    console.error('\x1b[31m%s\x1b[0m', 'Internal Error')
    console.log(error.message, 'at', error.stack)
    process.exit(0)
  }
}
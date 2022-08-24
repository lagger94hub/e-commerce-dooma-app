const FRIENDLY_ERROR_500 = "Oops Something went wrong!!"

const logError = (functionName, details) => {

  console.log('------------------------------------')
  console.log(`Error caught and rethrown in :${functionName}()`)
  console.log(`Error Details: ${details}`);
  console.log('------------------------------------')
}
export {
  logError,
  FRIENDLY_ERROR_500
}
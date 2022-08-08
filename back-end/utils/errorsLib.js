const FRIENDLY_ERROR_500 = "Oops Something went wrong!!"

const logError = (functionName, details, options) => {

  if (options && options.isSource) {
    console.log('------------------------------------')
    console.log(`Something went wrong in :${functionName}()`);
  } else {
    console.log(`Error caught and rethrown in :${functionName}()`);
  }
  console.log(`Error Details: ${details}`);
  console.log('------------------------------------')
}
export {
  logError,
  FRIENDLY_ERROR_500
}
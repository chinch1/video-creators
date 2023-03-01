export const retrieveSession = () => {
  const loggedCreator = window.localStorage.getItem('loggedCreator')
  let parsedLoggedCreator: any
  if (loggedCreator) parsedLoggedCreator = JSON.parse(loggedCreator)
  return parsedLoggedCreator
}

type Logger = {
  info: (params: [unknown[]]) => void,
  error: (params: [unknown[]]) => void,
}

const logger: Logger = {
  info: ()
}
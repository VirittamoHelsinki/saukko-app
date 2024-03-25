import { Request, Response, NextFunction } from 'express';
type Logger = {
  info: (params: any[]) => void,
  error: (params: [unknown[]]) => void,
}

const logger: Logger = {
  info: (...params) => console.log(...params),
  error: (...params) => console.error(...params)
}

const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  logger.info(['Method:', req.method])
  logger.info(['Path:  ', req.path])
  logger.info(['Body:  ', req.body])
  logger.info(['---'])
  next()
}

const unknownEndpoint = (request: Request, response: Response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error: Error | any, request: Request, response: Response, next: NextFunction) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })

  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

export default {
  logger,
  requestLogger,
  unknownEndpoint,
  errorHandler,
}

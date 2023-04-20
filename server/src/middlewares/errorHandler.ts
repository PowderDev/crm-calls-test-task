import { ErrorRequestHandler } from 'express'

const errorHandler: ErrorRequestHandler = (err, _, res, __) => {
  return res
    .status(err.status || 500)
    .json({ message: err.message || 'Something Went Wrong' })
}

export default errorHandler

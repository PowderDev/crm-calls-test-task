import { NextFunction, Request, Response } from 'express'
import { RequestsExecutionType } from '../types/requests'
import requestsService, { RequestResult } from '../services/Requests.service'
import HTTPException from '../exceptions/HTTPException'

class RequestController {
  async executeRequests(req: Request, res: Response, next: NextFunction) {
    try {
      const executionType = req.query.type || RequestsExecutionType.PARALLEL
      const links = req.body.links

      let data: RequestResult<unknown>

      if (executionType == RequestsExecutionType.SEQUENCE) {
        data = await requestsService.requestsInSequence(links)
      } else if (executionType == RequestsExecutionType.PARALLEL) {
        data = await requestsService.requestsInParallel(links)
      } else {
        throw HTTPException.BadRequest(
          "Execution type must either 'parallel' or 'sequence'",
        )
      }

      return res.json(data)
    } catch (err) {
      next(err)
    }
  }
}

export default new RequestController()

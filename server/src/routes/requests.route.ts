import { Router } from 'express'
import RequestController from '../controllers/Requests.controller'
const router = Router()

router.post('/requests', RequestController.executeRequests)

export default router

import {Router} from 'express'
import { WebhookController } from '../controllers/WebhookController.js'


const router = Router()

const wbh = new WebhookController()

//routes
router.post('/', wbh.handlePaymentNotification)



export default router
import {Router} from 'express'
import { AuthController } from '../controllers/AuthController.js'

//container de endpoints do Express
const router = Router();

//instancia
const auth = new AuthController()

router.post('/', auth.login)

export default router
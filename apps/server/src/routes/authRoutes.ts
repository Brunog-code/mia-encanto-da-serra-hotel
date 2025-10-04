import {Router} from 'express'
import { AuthController } from '../controllers/AuthController.js'
import { authenticateToken } from '../middlewares/authenticateToken.js';

//container de endpoints do Express
const router = Router();

//instancia
const auth = new AuthController()

router.post('/', auth.login)
router.post('/forgot-password', auth.forgotPassword)
router.post('/reset-password', auth.resetPassword)
router.get('/', authenticateToken, auth.getMe)

export default router
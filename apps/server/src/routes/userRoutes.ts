import { Router } from "express";
import { UserController } from "../controllers/UserController.js";

//container de endpoints do Express
const router = Router()

//instância
const user = new UserController()

//endpoints e controllers
router.post('/', user.create)
router.get('/:id', user.getUserById)

export default router
import { Router } from "express";
import { RoomController } from "../controllers/RoomController.js";

//container de endpoints do Express
const router = Router();

//instancia
const RmController = new RoomController()

//endpoints e controllers
router.get('/availability', RmController.getAvailability)
router.get('/', RmController.getAllRooms)
router.get('/:id', RmController.getRoomById)


export default router
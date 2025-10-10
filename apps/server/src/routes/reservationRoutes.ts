import { Router } from "express";
import { ReservationController } from "../controllers/ReservationController.js";

//container de endpoints do Express
const router = Router()

//instancia
const reserv = new ReservationController()

router.post('/', reserv.createReservation)
router.get('/:id', reserv.getAllReservations)


export default router
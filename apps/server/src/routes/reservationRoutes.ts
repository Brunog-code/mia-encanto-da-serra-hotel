import { Router } from "express";
import { ReservationController } from "../controllers/ReservationController.js";

//container de endpoints do Express
const router = Router()

//instancia
const reserv = new ReservationController()

router.get('/number', reserv.getNumberReservation)
router.post('/', reserv.createReservation)


export default router
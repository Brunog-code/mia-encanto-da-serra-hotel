import { Router } from "express";
import { PaymentController } from "../controllers/PaymentController.js";

//container de endpoints do Express
const router = Router();

//instancia
const payment = new PaymentController();

//endpoints
router.post("/", payment.createPaymentPreference);
router.post("/simulate_payment", payment.simulatePaymentPreference);
router.post("/refund", payment.refundPayment);
router.get("/success", payment.success);
router.get("/failure", payment.failure);
router.get("/pending", payment.pending);

export default router;

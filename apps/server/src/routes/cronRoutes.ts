import { Router } from "express";
import { CronController } from "../controllers/CronController.js";
import { cronAcess } from "../middlewares/cronAcess.js";

//instancia o router
const router = Router();

//instancia o controller
const cronController = new CronController();

// endpoint que executa o job manualmente (ou via cron-job.org)
router.get("/cancel", cronAcess, cronController.cancelOldReservations);

export default router;

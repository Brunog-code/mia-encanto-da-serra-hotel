import { Router } from "express";
import { ImageController } from "../controllers/ImageController.js";

//container de endpoints do Express
const router = Router();

//instância
const imgController = new ImageController(); 

//endpoints e controllers
router.get('/', imgController.getAllImages); 
router.get('/category', imgController.getImagesByCategory); 
router.get('/roomType', imgController.getImagesByRoomType); 

export default router;
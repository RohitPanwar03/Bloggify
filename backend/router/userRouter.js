import express from 'express';  
import { getUserController, loginController, registerController } from '../controllers/userControllers.js';
import authMiddleware from '../Middleware/authMiddleware.js';

const router = express.Router();

router.post('/register',registerController)
router.post('/login',loginController)
router.get("/get-user-details",authMiddleware,getUserController)


export const userRouter = router;
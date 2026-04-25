import { Router } from 'express';
import { AuthController } from './Auth.controller';

import { authMiddleware } from '../../middlewares/auth.middleware';

import { upload } from '../../config/multer';

const router = Router();
const authController = new AuthController();

router.post('/login', authController.login);
router.post('/register', authController.register);
router.get('/profile', authMiddleware, authController.getProfile);
router.put('/profile', authMiddleware, authController.updateProfile);
router.post('/profile-image', authMiddleware, upload.single('image'), authController.uploadProfileImage);
router.post('/profile-banner', authMiddleware, upload.single('image'), authController.uploadProfileBanner);

export default router;




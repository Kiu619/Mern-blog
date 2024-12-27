import express from 'express';
import { authController } from '../../controllers/authController.js';
import { authValidation } from '../../validations/authValidation.js';
const router = express.Router();

// router.post('/signup', authController.signUp);
router.route('/signup')
    .post(authValidation.signUp, authController.signUp);
router.route('/signin')
    .post( authController.signIn);
router.route('/googleAuth')
    .post( authController.googleAuth);
router.route('/signout')
    .get( authController.signOut);
export default router;

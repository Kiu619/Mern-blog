import express from "express";
import { userController } from "../../controllers/userController.js";
import { userValidation } from "../../validations/userValidation.js";

const router = express.Router();

router.put('/update/:id', userValidation.verifyToken ,userController.updateUser);
router.delete('/delete/:id', userValidation.verifyToken ,userController.deleteUser);
router.get('/get-users', userValidation.verifyToken ,userController.getUsers);
router.get('/get-user/:id', userController.getUser);
export default router;



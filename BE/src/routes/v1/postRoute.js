import express from "express";
import { postController } from "../../controllers/postController.js";
import { userValidation } from "../../validations/userValidation.js";


const router = express.Router();

router.post('/create-post', userValidation.verifyToken ,postController.createPost);
router.get('/get-posts', postController.getPosts);
router.delete('/delete-post/:postId/:userId', userValidation.verifyToken, postController.deletePost);
router.put('/update-post/:postId/:userId', userValidation.verifyToken, postController.updatePost);
export default router;
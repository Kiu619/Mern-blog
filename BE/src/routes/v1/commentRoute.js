import express from "express";
import { userValidation } from "../../validations/userValidation.js";
import { commentController } from "../../controllers/commentController.js";

const router = express.Router();

router.post('/create-comment', userValidation.verifyToken, commentController.createComment);
router.get('/get-comments/:postId', commentController.getComments);
router.put('/edit-comment/:commentId', userValidation.verifyToken, commentController.editComment);
router.put('/like-comment/:commentId', userValidation.verifyToken, commentController.likeComment);
router.delete('/delete-comment/:commentId/:userId', userValidation.verifyToken, commentController.deleteComment);
router.get('/get-comments-for-admin', userValidation.verifyToken, commentController.getCommentsForAdmin);
export default router;




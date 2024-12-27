import express from "express";
import userRoutes from "./userRoute.js";
import authRoutes from "./authRoute.js";
import postRoutes from "./postRoute.js";
import commentRoutes from "./commentRoute.js";

const router = express.Router();

router.use("/user", userRoutes);
router.use("/auth", authRoutes);
router.use("/post", postRoutes);
router.use("/comment", commentRoutes);

export default router;

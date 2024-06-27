import express, { Router } from "express";
import userRoutes from "./user.routes";
import bookRoutes from "./book.routes";
import authorRoutes from "./author.routes";
import categoryRoutes from "./category.routes";
import postRoutes from "./post.routes";
import { authUser } from "../middleware";

const router: Router = express.Router();

router.use("/", userRoutes);

router.use("/book", bookRoutes);

router.use("/author", authUser, authorRoutes);

router.use("/category", authUser, categoryRoutes);

router.use("/posts", authUser, postRoutes);

export default router;

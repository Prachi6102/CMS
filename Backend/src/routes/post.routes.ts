import express, { Router } from "express";
import * as controller from "../controller/post.controller";

const router: Router = express.Router();

router.post("/add", controller.addPost);

router.get("/all-posts", controller.getAllPost);

export default router;

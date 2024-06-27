import express, { Router } from "express";
import * as controller from "../controller/category.controller";
import { authorize } from "../middleware/auth";

const router: Router = express.Router();

router.post("/add", authorize(["Admin"]), controller.addCategory);

router.get("/categories", controller.getAllCategories);

export default router;

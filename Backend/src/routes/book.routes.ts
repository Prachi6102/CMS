import express, { Router } from "express";
import * as controller from "../controller/book.controller";
import { authorize } from "../middleware/auth";

const router: Router = express.Router();

router.post("/add", authorize(["Admin"]), controller.addBook);

export default router;

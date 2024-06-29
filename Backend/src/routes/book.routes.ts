import express, { Router } from "express";
import * as controller from "../controller/book.controller";
import { authorize, upload } from "../middleware";

const router: Router = express.Router();

router.post(
  "/add",
  authorize(["Admin"]),
  upload.fields([
    {
      name: "cover_img",
      maxCount: 1,
    },
    {
      name: "book_pdf",
      maxCount: 1,
    },
  ]),
  controller.addBook
);

router.get("/books", controller.getAllBooks);

export default router;

import * as controller from "../controller/author.controller";
import express, { Router } from "express";
import { upload } from "../middleware";
import { authorize } from "../middleware/auth";

const router: Router = express.Router();

router.post(
  "/add",
  authorize(["Admin"]),
  upload.fields([
    {
      name: "profile_pic",
      maxCount: 1,
    },
  ]),
  controller.addAuthor
);

router.get("/authors", controller.getAllAuthors);

router.patch(
  "/update/:id",
  authorize(["Admin"]),
  upload.fields([
    {
      name: "profile_pic",
      maxCount: 1,
    },
  ]),
  controller.updateAuthor
);

router.get("/:id", authorize(["Admin"]), controller.getAuthorById);

router.delete("/delete/:id", authorize(["Admin"]), controller.deleteAuthor);

export default router;

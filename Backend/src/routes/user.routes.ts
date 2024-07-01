import express, { Router } from "express";
import * as controller from "../controller/user.controller";
import { authUser, upload } from "../middleware";
import { authorize } from "../middleware/auth";

const router: Router = express.Router();

router.post(
  "/register",
  upload.fields([
    {
      name: "profile_pic",
      maxCount: 1,
    },
  ]),
  controller.register
);

router.post("/login", controller.login);

router.get("/profile", authUser, controller.getCurrentUser);

router.get("/users", authUser, authorize(["Admin"]), controller.getAllUsers);

export default router;

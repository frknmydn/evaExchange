

import express from "express";
import { UserController } from "../Controller/user.controller"
import { UserService } from "../Services/user.service";

const router = express.Router();

const userService = new UserService();
const userController = new UserController(userService);

router.post("/users", (req, res) => userController.createUser(req, res));
router.get("/users/:id", (req, res) => userController.getUserById(req, res));

export default router;

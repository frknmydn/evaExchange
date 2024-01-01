

import express from "express";
import { UserController } from "../Controller/user.controller"
import { UserService } from "../Services/user.service";
import authenticateToken from '../middleware/authenticateToken';

const router = express.Router();

const userService = new UserService();
const userController = new UserController(userService);
/**
 * @swagger
 * /users:
 *   post:
 *     summary: It creates new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Kullanıcı başarıyla oluşturuldu
 */
router.post("/users", (req, res) => userController.createUser(req, res));
/**
 * @swagger
 * /users:
 *   get:
 *     summary: Kullanıcı girişi yapar
 *     description: Kullanıcının email ve şifresi ile giriş yapmasını sağlar.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 description: Kullanıcının email adresi.
 *               password:
 *                 type: string
 *                 description: Kullanıcının şifresi.
 *     responses:
 *       200:
 *         description: Başarılı giriş
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *                 token:
 *                   type: string
 *                   description: JWT token
 *       400:
 *         description: Geçersiz istek
 */
router.get("/users", (req, res) => userController.signIn(req, res));
router.get("/users/:id",authenticateToken ,(req, res) => userController.getUserById(req, res));

export default router;

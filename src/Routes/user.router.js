"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../Controller/user.controller");
const user_service_1 = require("../Services/user.service");
const authenticateToken_1 = __importDefault(require("../middleware/authenticateToken"));
const router = express_1.default.Router();
const userService = new user_service_1.UserService();
const userController = new user_controller_1.UserController(userService);
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
router.get("/users/:id", authenticateToken_1.default, (req, res) => userController.getUserById(req, res));
exports.default = router;

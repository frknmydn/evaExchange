"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) {
        return res.sendStatus(401);
    }
    const jwtSecret = process.env.JWT_SECRET || 'default_secret_key';
    jsonwebtoken_1.default.verify(token, jwtSecret, (err, decoded) => {
        if (err) {
            return res.sendStatus(403);
        }
        //firstly check decoded is jwtpayload or string to valideate
        if (typeof decoded === 'object' && decoded !== null) {
            req.user = decoded; // Tip dönüşümü
            next();
        }
        else {
            return res.sendStatus(403);
        }
    });
};
exports.default = authenticateToken;

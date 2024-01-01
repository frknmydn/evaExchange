"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const user_model_1 = __importDefault(require("../Model/user.model"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
class UserService {
    createUser(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            const saltRounds = 10;
            const hashedPassword = yield bcrypt_1.default.hash(userData.password, saltRounds);
            userData.password = hashedPassword;
            const user = yield user_model_1.default.create(userData);
            return user;
        });
    }
    getUserById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_model_1.default.findByPk(userId);
            return user;
        });
    }
    decreaseUserBalance(userId, decreasedBalance) {
        return __awaiter(this, void 0, void 0, function* () {
            const findingUser = yield this.getUserById(userId);
            if (!findingUser) {
                throw new Error("User not found");
            }
            // Update the user's balance
            findingUser.balance = findingUser.balance - decreasedBalance;
            yield findingUser.save();
            return findingUser;
        });
    }
    increaseUserBalance(userId, decreasedBalance) {
        return __awaiter(this, void 0, void 0, function* () {
            const findingUser = yield this.getUserById(userId);
            if (!findingUser) {
                throw new Error("User not found");
            }
            console.log(decreasedBalance);
            findingUser.balance = +findingUser.balance + +decreasedBalance;
            console.log(findingUser.balance);
            yield findingUser.save();
            return findingUser;
        });
    }
    signIn(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_model_1.default.findOne({ where: { email } });
            if (!user) {
                throw new Error('User not found');
            }
            const isMatch = yield bcrypt_1.default.compare(password, user.password);
            if (!isMatch) {
                throw new Error('Invalid credentials');
            }
            const jwtSecret = process.env.JWT_SECRET;
            if (!jwtSecret) {
                throw new Error("JWT secret is not defined. Please set the JWT_SECRET environment variable.");
            }
            const token = jsonwebtoken_1.default.sign({ id: user.id }, jwtSecret, { expiresIn: '1h' });
            return { user, token };
        });
    }
}
exports.UserService = UserService;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const generateToken = ({ userId, res }) => {
    const token = jsonwebtoken_1.default.sign({ userId }, process.env.JWT_SECRET || "", { expiresIn: "7d" });
    res.cookie("jwt", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "none",
        maxAge: 7 * 24 * 60 * 60 * 1000
    });
    return token;
};
exports.generateToken = generateToken;

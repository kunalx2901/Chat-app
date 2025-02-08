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
exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not set in environment variables');
}
const generateToken = (_a) => __awaiter(void 0, [_a], void 0, function* ({ userId, res }) {
    try {
        const token = yield jsonwebtoken_1.default.sign({ userId }, process.env.JWT_SECRET || "", { expiresIn: '7d' });
        console.log(`Token generated: ${token}`);
        try {
            yield res.cookie("jwt", token, {
                httpOnly: false,
                secure: process.env.NODE_ENV !== "development",
                sameSite: true,
                maxAge: 7 * 24 * 60 * 60 * 1000
            });
            console.log("Cookie generated " + token);
        }
        catch (error) {
            console.error(`Error setting cookie: ${error}`);
        }
        return token;
    }
    catch (error) {
        console.error(`Error generating token: ${error}`);
        res.clearCookie("jwt");
        res.status(500).json("Internal Server Error !");
    }
});
exports.generateToken = generateToken;

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
exports.protectRoute = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = __importDefault(require("../models/user.model"));
const protectRoute = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = yield req.cookies.jwt;
        if (!token) {
            console.log("No Token Provided !");
            return res.status(401).json({
                msg: "No Token Provided !"
            });
        }
        if (!process.env.JWT_SECRET) {
            throw new Error('JWT_SECRET is not defined');
        }
        const decoded = yield jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({
                msg: "Invalid Token !"
            });
        }
        const user = yield user_model_1.default.findById(decoded.userId).select("-password");
        if (!user) {
            return res.status(401).json({
                msg: "User does not exist! "
            });
        }
        req.user = user;
        next();
    }
    catch (error) {
        console.log("Error Occured Due to " + error);
        res.status(500).json({
            msg: "Internal Server Error !"
        });
    }
});
exports.protectRoute = protectRoute;

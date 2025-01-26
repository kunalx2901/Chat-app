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
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("../controllers/auth.controller");
const auth_controller_2 = require("../controllers/auth.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = express_1.default.Router();
router.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, auth_controller_1.signup)(req, res);
}));
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, auth_controller_1.login)(req, res);
}));
router.post("/logout", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, auth_controller_1.logout)(req, res);
}));
router.put('/update-profile', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, auth_middleware_1.protectRoute)(req, res, next);
}), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, auth_controller_2.updateProfile)(req, res);
}));
router.get("/check", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, auth_middleware_1.protectRoute)(req, res, next);
}), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, auth_controller_1.checkRoute)(req, res);
}));
exports.default = router;

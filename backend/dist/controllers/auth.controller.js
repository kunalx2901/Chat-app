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
exports.checkRoute = exports.updateProfile = exports.logout = exports.login = exports.signup = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const util_1 = require("../lib/util");
const cloudinary_1 = __importDefault(require("../lib/cloudinary"));
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { fullname, email, password } = req.body;
    try {
        if (!fullname || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters long" });
        }
        const user = yield user_model_1.default.findOne({ email });
        if (user) {
            res.json({ message: "User already exists" });
        }
        else {
            const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
            const newUser = yield new user_model_1.default({
                fullname: fullname,
                email: email,
                password: hashedPassword,
            });
            if (newUser) {
                // generate jwt token 
                try {
                    const jwt = yield (0, util_1.generateToken)({ userId: newUser._id.toString(), res: res });
                    console.log("jwt token generated : " + jwt);
                }
                catch (error) {
                    console.log("error in generating token " + error);
                }
                yield newUser.save();
                res.status(201).json({
                    id: newUser._id,
                    fullname: newUser.fullname,
                    email: newUser.email,
                    profileImage: newUser.profileImage
                });
            }
            else {
                res.status(400).json({
                    message: "Invalid data credentials !"
                });
            }
        }
    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            message: "Internal Server Error !"
        });
    }
});
exports.signup = signup;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield user_model_1.default.findOne({ email });
        if (!user) {
            return res.status(400).json({
                msg: "Invalid Credentials !"
            });
        }
        const isCorrectPassword = yield bcryptjs_1.default.compare(password, user.password);
        if (!isCorrectPassword) {
            return res.status(400).json({
                msg: "Invalid Credentials !"
            });
        }
        try {
            yield (0, util_1.generateToken)({ userId: user._id.toString(), res: res });
            console.log("jwt token generated");
        }
        catch (error) {
            console.log("error in login route " + error);
        }
        res.status(200).json({
            msg: "User logged in successfully !"
        });
    }
    catch (e) {
        console.log("Error Occured Due to " + e);
        res.status(500).json({
            message: "Internal Server Error !"
        });
    }
});
exports.login = login;
const logout = (req, res) => {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({
        msg: "User Logged out !"
    });
};
exports.logout = logout;
const updateProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { profileImage } = req.body;
        const userId = req.user._id;
        if (!profileImage) {
            return res.status(400).json({
                msg: "Please provide a profile image !"
            });
        }
        const uploaderResponse = yield cloudinary_1.default.uploader.upload(profileImage);
        const user = yield user_model_1.default.findOneAndUpdate({ _id: userId }, { profileImage: uploaderResponse.secure_url }, { new: true });
        res.status(200).json({
            updatedUser: user
        });
    }
    catch (error) {
        console.log("Error Occured Due to " + error);
        res.status(500).json({
            message: "Internal Server Error !"
        });
    }
});
exports.updateProfile = updateProfile;
const checkRoute = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.json(req.user);
    }
    catch (error) {
        console.log("error in checkAuth controller " + error);
        res.status(500).json({
            message: "Internal Server Error !"
        });
    }
});
exports.checkRoute = checkRoute;

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
exports.SendMessage = exports.GetMessage = exports.GetUsersForSidebar = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const message_model_1 = __importDefault(require("../models/message.model"));
const cloudinary_1 = require("cloudinary");
const GetUsersForSidebar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const loggedInUser = req.user._id;
        const users = yield user_model_1.default.findOne({ _id: { $ne: loggedInUser } }).select("-password");
        res.status(200).json({
            status: "success",
            users
        });
    }
    catch (error) {
        console.log("Error occured in the GetUsersForSidebar controller " + error);
        res.status(500).json({
            msg: "Internal Server Error !"
        });
    }
});
exports.GetUsersForSidebar = GetUsersForSidebar;
const GetMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const myId = req.user._id;
        const { id: receiverId } = req.params;
        const messages = yield message_model_1.default.find({
            $or: [
                { senderId: myId, receiverId: receiverId },
                { senderId: receiverId, receiverId: myId }
            ]
        });
        res.status(200).json({
            messages
        });
    }
    catch (error) {
        console.log("Error occured in the GetMessage controller " + error);
        res.status(500).json({
            msg: "Internal Server Error !"
        });
    }
});
exports.GetMessage = GetMessage;
const SendMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { text, image } = req.body;
        const myId = req.user._id;
        const { id: receiverId } = req.params;
        let imageUrl;
        if (image) {
            const imageBuffer = yield cloudinary_1.v2.uploader.upload(image);
            imageUrl = imageBuffer.secure_url;
        }
        const newMessage = new message_model_1.default({
            senderId: myId,
            receiverId,
            text,
            image: imageUrl
        });
        yield newMessage.save();
        // todo: realtime funtionality goes here : socket.io
        res.status(200).json({
            msg: "Message Sent !"
        });
    }
    catch (e) {
        console.log("Error occured in the SendMessage controller " + e);
        res.status(500).json({
            msg: "Internal Server Error !"
        });
    }
});
exports.SendMessage = SendMessage;

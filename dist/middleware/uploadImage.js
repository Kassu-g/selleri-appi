"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const uuid_1 = require("uuid");
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/Images');
    },
    filename: (req, file, cb) => {
        const originalFilename = file.originalname.split('.')[0];
        const fileExtension = file.originalname.split('.').pop();
        const uniqueId = (0, uuid_1.v4)();
        const newFilename = `${originalFilename}_${uniqueId}.${fileExtension}`;
        cb(null, newFilename);
    }
});
const upload = (0, multer_1.default)({
    storage: storage,
    fileFilter: (req, file, cb) => {
        cb(null, true);
    },
    limits: { fileSize: 5 * 1024 * 1024 }
});
exports.default = upload;

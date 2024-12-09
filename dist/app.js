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
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const multer_1 = __importDefault(require("multer"));
const Offer_1 = require("./models/Offer");
const api = (0, express_1.default)();
const PORT = 3000;
api.use(body_parser_1.default.urlencoded({ extended: true }));
api.use(body_parser_1.default.json());
api.use(express_1.default.static("public"));
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({ storage });
mongoose_1.default
    .connect("mongodb://127.0.0.1:27017/testdb")
    .then(() => console.log("Konnektaa "))
    .catch((err) => console.error("taas error:", err));
api.post("/upload", upload.single("image"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description, price } = req.body;
        if (!title || !description || typeof price === "undefined") {
            return res.status(400).send("All fields are required.");
        }
        const newOffer = new Offer_1.Offer({
            title,
            description,
            price,
        });
        yield newOffer.save();
        return res.status(201).send("Success.");
    }
    catch (err) {
        console.error(err);
        return res.status(500).send("Error while saving");
    }
}));
api.listen(PORT, () => {
    console.log(`Täällä toimii http://localhost:${PORT}`);
});

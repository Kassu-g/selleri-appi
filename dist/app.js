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
const uploadImage_1 = __importDefault(require("./middleware/uploadImage"));
const mongoose_1 = __importDefault(require("mongoose"));
const Offer_1 = require("./models/Offer");
const Image_1 = require("./models/Image");
const api = (0, express_1.default)();
const PORT = 3000;
api.use(express_1.default.json());
api.use(express_1.default.urlencoded({ extended: true }));
api.use(express_1.default.static("public"));
mongoose_1.default
    .connect("mongodb://127.0.0.1:27017/testdb")
    .then(() => console.log("Connection"))
    .catch((err) => console.error("Error:", err));
api.post("/upload", uploadImage_1.default.single("image"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description, price } = req.body;
        const image = req.file;
        if (!title || !description || typeof price === "undefined") {
            return res.status(400).send("All fields are required.");
        }
        let imageId = "";
        if (image) {
            const imageFilename = image.filename;
            const imagePath = `public/images/${imageFilename}`;
            const newImage = new Image_1.Image({
                filename: imageFilename,
                path: imagePath
            });
            yield newImage.save();
            imageId = newImage._id.toString();
        }
        const newOffer = new Offer_1.Offer({
            title,
            description,
            price,
            imageId
        });
        yield newOffer.save();
        return res.status(201).send("Offer uploaded successfully");
    }
    catch (err) {
        return res.status(500).send("Server error: " + err.message);
    }
}));
api.get('/offers', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const offers = yield Offer_1.Offer.find().populate('imageId');
        const offerData = offers.map(offer => {
            return {
                title: offer.title,
                description: offer.description,
                price: offer.price,
                imagePath: offer.imageId ? offer.imageId.path : null
            };
        });
        return res.json(offerData);
    }
    catch (err) {
        console.error(err);
        return res.status(500).send('Server error');
    }
}));
api.listen(PORT, () => {
    console.log(`Running on http://localhost:${PORT}`);
});

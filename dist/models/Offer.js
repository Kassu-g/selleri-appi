"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Offer = void 0;
const mongoose_1 = require("mongoose");
const offerSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    imageId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Image' }
});
const Offer = (0, mongoose_1.model)('Offer', offerSchema);
exports.Offer = Offer;

import express, { Request, Response } from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import multer from "multer";
import { Offer } from "./models/Offer";

const api = express();
const PORT = 3000;
api.use(bodyParser.urlencoded({ extended: true }));
api.use(bodyParser.json());
api.use(express.static("public"));
const storage = multer.memoryStorage();
const upload = multer({ storage });
mongoose
  .connect("mongodb://127.0.0.1:27017/testdb")
  .then(() => console.log("Konnektaa "))
  .catch((err) => console.error("taas error:", err));

api.post("/upload", upload.single("image"), async (req: Request, res: Response) => {
  try {
    const { title, description, price } = req.body;

    if (!title || !description || typeof price === "undefined") {
      return res.status(400).send("All fields are required.");
    }

    const newOffer = new Offer({
      title,
      description,
      price,
    });

    await newOffer.save();

    return res.status(201).send("Success.");
  } catch (err) {
    console.error(err);
    return res.status(500).send("Error while saving");
  }
});

api.listen(PORT, () => {
  console.log(`Täällä toimii http://localhost:${PORT}`);
});

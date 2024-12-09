import express, { Request, Response } from "express";
import upload from "./middleware/uploadImage";
import mongoose from "mongoose";
import { Offer } from "./models/Offer";
import { Image } from "./models/Image";

const api = express();
const PORT = 3000;
api.use(express.json());
api.use(express.urlencoded({ extended: true }));
api.use(express.static("public"));

mongoose
  .connect("mongodb://127.0.0.1:27017/testdb")
  .then(() => console.log("Connection"))
  .catch((err) => console.error("Error:", err));

api.post("/upload", upload.single("image"), async (req: Request, res: Response) => {
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

      const newImage = new Image({
        filename: imageFilename,
        path: imagePath
      });

      await newImage.save();
      imageId = newImage._id.toString();
    }

    const newOffer = new Offer({
      title,
      description,
      price,
      imageId
    });

    await newOffer.save();
    return res.status(201).send("Offer uploaded successfully");
  } catch (err) {
    return res.status(500).send("Server error: " + err.message);
  }
});

api.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

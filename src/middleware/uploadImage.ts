import multer, { Multer } from "multer";
import { v4 as uuidv4 } from "uuid";
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/images');
  },
  filename: (req, file, cb) => {
    const originalFilename = file.originalname.split('.')[0];
    const fileExtension = file.originalname.split('.').pop();
    const uniqueId = uuidv4();

    const newFilename = `${originalFilename}_${uniqueId}.${fileExtension}`;
    cb(null, newFilename);
  }
});

const upload: Multer = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    
    cb(null, true);
  },
  limits: { fileSize: 5 * 1024 * 1024 }
});

export default upload;

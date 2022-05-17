import multer from "multer";
import sharp from "sharp";

const storage = multer.memoryStorage();

const upload = multer({
  storage: storage
})

export const resizeUploadPhoto = async (req, res, next) => {
  if(!req.file) return next();
  let {imageHash} = req.body;
  let imageId = imageHash.slice(-5);
  

  req.file.filename = `campaign-${imageId}.jpeg`;

  await sharp(req.file.buffer)
      .toFile(`public/campaigns/${req.file.filename}`);


  next();
};


export default upload;
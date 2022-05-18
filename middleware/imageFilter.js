import multer from "multer";

import handleUpload from "./fileUploaderToS3";



const storage = multer.memoryStorage();

const upload = multer({
  storage: storage
});



export const resizeUploadPhoto = async (req, res, next) => {
  
  if(!req.file) return next();
  let {imageHash, image} = req.body;
  let imageId = imageHash.slice(-5);
  
  let imageName = `campaign-${imageId}.jpeg`;
  req.file.filename = imageName;
  

  await handleUpload(req.file.buffer, imageName);
  
 

  next();
};


export default upload;
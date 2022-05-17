import nextConnect from "next-connect";
import dbConnect from "../../middleware/database";

import Campaigns from "../../model/campaign.model";

import upload , {resizeUploadPhoto}from "../../middleware/imageFilter";

import filterRequestBody from "../../middleware/filterBody";

export const config = {
  api: {
    bodyParser: false,
  },
};

const apiRoute = nextConnect({
  onError(error, req, res) {
    res
      .status(501)
      .json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.use(upload.single("image"));
apiRoute.use(resizeUploadPhoto);

apiRoute.post(async (req, res) => {
  await dbConnect();

  const filterRequest = filterRequestBody(
    req.body,
    "name",
    "campaign",
    "description",
    "imageHash",
    "image",
    
  );
    
  if (req.file) filterRequest.image = req.file.filename;
   
  try {
    let response = await Campaigns.create(filterRequest);
   
    res.status(200);
    res.json(response);
  } catch (err) {
    res.status(500);
    console.error(err.message);
    res.json({ message: err.message });
  }
});

export default apiRoute;

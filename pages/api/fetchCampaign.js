import nextConnect from "next-connect";
import dbConnect from "../../middleware/database";

import Campaigns from "../../model/campaign.model";



// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

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



apiRoute.get(async (req, res) => {
  await dbConnect();
    let imageHash = req.query.imageHash;

  try {
    let response = await Campaigns.findOne({imageHash: imageHash});
   
    res.status(200);
    res.json(response);
  } catch (err) {
    res.status(500);
    console.error(err.message);
    res.json({ message: err.message });
  }
});

export default apiRoute;

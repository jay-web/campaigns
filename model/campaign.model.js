const mongoose = require("mongoose");


const CampaignSchema = mongoose.Schema({
    name: {
        type:String,
        required:[true, "Please mention campaign creator name"]
    },
    campaign:{
        type: String,
        required:[ true, "Please mention campaign name"]
    },
    description:{
        type: String,
        required: [true, "Please mention campaign description"]
    },
    imageHash:{
        type:String,
        unique: true
    },
    image:{
        type: [String],
        default: "default.jpg"
    }
},
{
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});

const Campaigns = mongoose.models.Campaigns || mongoose.model('Campaigns', CampaignSchema);

export default Campaigns;
import axios from "axios";
export async function loadData(hash){
    let baseUrl = "";
    if(process.env.NODE_ENV == "development"){
        baseUrl = `http://localhost:3000`
    }else{
        baseUrl = `https://campaigns-lovat.vercel.app`;
    }
    try{
        const response = await axios(`${baseUrl}/api/fetchCampaign?imageHash=${hash}`);
       
        return response;
      }catch(err){
        console.log("error in fetching ", err.message)
      }
}
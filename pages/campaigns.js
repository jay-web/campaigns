import React from "react";
import factory from "../utils/factory";
import campaignInstance from "../utils/campaign";
import "semantic-ui-css/semantic.min.css";

import Campaigns from "../components/campaigns";

import CustomButton from "../components/customButton";

import Layout from "../components/layout";
import { useRouter } from "next/router";
import { Grid } from "semantic-ui-react";

import styles from "../styles/Campaigns.module.css"

export async function getStaticProps({ params }) {
 
    
      let cam = await factory.methods.getDeployedCampaigns().call();
      
      if(cam){
      let listOfCampaigns = await Promise.all(
        cam.map(async (el, index) => {
          let campaign = await campaignInstance(el);
          return await campaign.methods.getSummary().call();
        })
      );
      return {
        props: {
          listOfCampaigns: JSON.parse(JSON.stringify(listOfCampaigns)),
          campAddress: JSON.parse(JSON.stringify(cam)),
        },
        revalidate:7
        
      };
    }
 
  return {
    props: {
      listOfCampaigns: [],
      campAddress: [],
    },
  };
}

const CampaignIndex = (props) => {
  const router = useRouter();
 
  return (
    <>
      <Layout background={styles.main}>
        
        
              <CustomButton
                content="Create Campaign"
                iconName="add"
                floated={true}
                onSubmit={() => router.push("/campaign/new")}
                loading={false}
              />
           

        <div className={styles.box}>
          
            <Campaigns
              campaigns={props.listOfCampaigns}
              campAddress={props.campAddress}
            />
          
       
        </div>
      </Layout>
    </>
  );
};



export default CampaignIndex;

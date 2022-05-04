import React from "react";
import factory from "../utils/factory";
import campaignInstance from "../utils/campaign";
import "semantic-ui-css/semantic.min.css";

import Campaigns from "../components/campaigns";

import CustomButton from "../components/customButton";

import Layout from "../components/layout";
import { useRouter } from "next/router";
import { Grid } from "semantic-ui-react";

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
      <Layout>
        <Grid>
          <Grid.Row>
            <Grid.Column width={13}>
              <p
                style={{
                  textAlign: "center",
                  marginBottom: "-.1rem",
                  fontSize: "2.5rem",
                  fontFamily: "Bitter, serif",
                }}
              >
                Out of the mountain of despair,
              </p>
              <p
                style={{
                  textAlign: "center",
                  fontSize: "2.5rem",
                  fontFamily: "Bitter, serif",
                }}
              >
                a stone of hope
              </p>
            </Grid.Column>
            <Grid.Column width={3}>
              <CustomButton
                content="Create Campaign"
                iconName="add"
                floated={true}
                onSubmit={() => router.push("/campaign/new")}
                loading={false}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Grid>
          <Grid.Row>
            <Campaigns
              campaigns={props.listOfCampaigns}
              campAddress={props.campAddress}
            />
          </Grid.Row>
        </Grid>
      </Layout>
    </>
  );
};



export default CampaignIndex;

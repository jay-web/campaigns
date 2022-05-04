import React from "react";
import Layout from "../../../components/layout";
import { useRouter } from "next/router";
import campaignInstance from "../../../utils/campaign";
import DetailCard from "../../../components/detailsCard";
import { Icon, Label, Grid } from "semantic-ui-react";

import ContributionForm from "../../../components/contribute";
import factory from "../../../utils/factory";

export async function getStaticProps({ params }) {
  console.log("unique campaign page props", params);

  let campaign = await campaignInstance(params.campaignId);
  let summary = await campaign.methods.getSummary().call();

  return {
    props: {
      name: summary[0],
      manager: summary[1],
      minimumContribution: summary[2],
      numberOfRequests: summary[3],
      approversCount: summary[4],
      fundReceived: summary[5],
      description: summary[6],
      id: params.campaignId,
    },
  };
}

export async function getStaticPaths() {
  let cam = await factory.methods.getDeployedCampaigns().call();

  let paths = cam.map((campaignId) => {
    return {
      params: {
        campaignId: campaignId,
      },
    };
  });

  return {
    paths: paths,
    fallback: true,
  };
}
const CampaignDetails = (props) => {
  const router = useRouter();
  const address = router.query.campaignId;

  if (router.isFallback) {
    return <div>Loading ...</div>;
  }
  return (
    <Layout>
      <h1>Campaign : {props.name.toUpperCase()}</h1>
      <Label style={{ marginBottom: "1rem" }}>
        <Icon name="address card" /> {address}
      </Label>
      <Grid>
        <Grid.Column width={10}>
          <DetailCard details={props} />
        </Grid.Column>
        <Grid.Column width={6}>
          <ContributionForm id={address} />
        </Grid.Column>
      </Grid>
    </Layout>
  );
};

export default CampaignDetails;

import React, { useState, useEffect } from "react";
import factory from "../utils/factory";
import campaignInstance from "../utils/campaign";
import "semantic-ui-css/semantic.min.css";

import Campaigns from "../components/campaigns";

import CustomButton from "../components/customButton";

import Layout from "../components/layout";
import { useRouter } from "next/router";
import { Grid } from "semantic-ui-react";

import styles from "../styles/Campaigns.module.css";

import { loadData } from "../utils/fetchData";

export async function getStaticProps({ params }) {
  let cam = await factory.methods.getDeployedCampaigns().call();

  if (cam) {
    let listOfCampaigns = await Promise.all(
      cam.map(async (el, index) => {
        let campaign = await campaignInstance(el);

        let camp = await campaign.methods.getSummary().call();

        //   const response = await loadData(camp[6]);
        //   let description = response?.data?.description || "";
        //   let imageurl = response?.data?.image[0] || "";

        //  camp = {...camp, description: description , imageurl: imageurl}

        return camp;
      })
    );

    return {
      props: {
        listOfCampaigns: JSON.parse(JSON.stringify(listOfCampaigns)),
        campAddress: JSON.parse(JSON.stringify(cam)),
      },
      revalidate: 7,
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
  const [listOfCamp, setListOfCamp] = useState(props.listOfCampaigns);

  useEffect(async () => {
    let updatedList = await Promise.all(
      listOfCamp.map(async (cam, index) => {
      const response = await loadData(cam[6]);
      let description = response?.data?.description || "";
      let imageurl = response?.data?.image[0] || "";

      cam = { ...cam, description: description, imageurl: imageurl };

      return cam;
    })
    );
    console.log(updatedList)
    setListOfCamp(updatedList);
  }, []);

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
          <Campaigns campaigns={listOfCamp} campAddress={props.campAddress} />
        </div>
      </Layout>
    </>
  );
};

export default CampaignIndex;

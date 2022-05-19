import React, { useState, useEffect } from "react";
import factory from "../utils/factory";
import campaignInstance from "../utils/campaign";
import "semantic-ui-css/semantic.min.css";

import Campaigns from "../components/campaigns";

import CustomButton from "../components/customButton";

import Layout from "../components/layout";
import { useRouter } from "next/router";


import styles from "../styles/Campaigns.module.css";

import { loadData } from "../utils/fetchData";

import Loading from "../components/loader";

export async function getStaticProps({ params }) {
  
  let cam = await factory.methods.getDeployedCampaigns().call();

  if (cam) {
    let listOfCampaigns = await Promise.all(
      cam.map(async (el, index) => {
        let campaign = await campaignInstance(el);
        let camp = await campaign.methods.getSummary().call();
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
  const [campAddress, setCampAddress] = useState(props.campAddress);
  const [showData, setShowData] = useState(false);

  useEffect(async () => {
    // let cam = await factory.methods.getDeployedCampaigns().call();
    if (campAddress) {
      let updatedList = await Promise.all(
        listOfCamp.map(async (el, index) => {
          // let campaign = await campaignInstance(el);
          console.log("el ", el);
          
          // let camp = await campaign.methods.getSummary().call();
          // console.log("camp ", camp);

          const response = await loadData(el[6]);

          let description = response?.data?.description || "";
          let imageurl = response?.data?.image[0] || "";

          el = { ...el, description: description, imageurl: imageurl };

          return el;
        })
      );

      setListOfCamp(updatedList);
      // setCampAddress(cam);
      setShowData(true);
    }
   
  }, [campAddress]);

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

        {
        showData  ? (
          <div className={styles.box}>
            <Campaigns campaigns={listOfCamp} campAddress={campAddress} />
          </div>
        ) :  <Loading />
        
        }
       
      </Layout>
    </>
  );
};

export default CampaignIndex;

import React, { useState } from "react";

import campaignInstance from "../../../../utils/campaign";
import web3 from "../../../../utils/web3";
import { useRouter } from "next/router";
import RequestForm from "../../../../components/newRequest";
import { Grid, Label, Icon } from "semantic-ui-react";
import Layout from "../../../../components/layout";
import ContractAddress from "../../../../components/contractAddress";

import styles from "../../../../styles/NewRequest.module.css";

const initialState = {
  recipient: "",
  value: 0,
  description: "",
};

const NewRequest = (props) => {
  const [requestInfo, setRequestInfo] = useState(initialState);
  const [loading, setLoading] = useState({ status: false, message: "" });
  const [error, setError] = useState({ status: false, message: "" });
  const router = useRouter();
  const campaignId = router.query.campaignId;

  const changeHandler = (event) => {
    event.preventDefault();
    setRequestInfo({ ...requestInfo, [event.target.name]: event.target.value });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setLoading({ status: true, message: "Transacting approving request" });
    setError({ status: false, message: "" });
    let { description, recipient, value } = requestInfo;

    if (value <= 0 || description == "" || recipient == "") {
      setLoading({ status: false, message: "" });
      setError({ status: true, message: "Please fill above all fields" });
      return;
    }

    try {
      const accounts = await web3.eth.getAccounts();
      const campaign = await campaignInstance(router.query.campaignId);
      value = web3.utils.toWei(value, "ether");

      await campaign.methods
        .createRequest(description, value, recipient)
        .send({ from: accounts[0] });
      setLoading({ status: false, message: "" });
      router.push(`/campaign/${campaignId}`);
    } catch (err) {
      setLoading({ status: false, message: "" });
      setError({ status: true, message: err.message });
    }
  };
  const handleDismiss = () => {
    setLoading({ status: false, message: "" });
    setError({ status: false, message: "" });
  };

  return (
    <Layout background={styles.main}>
      <Grid>
        <Grid.Row>
          <Grid.Column width={12}>
            
            <ContractAddress id={campaignId} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
      
      <RequestForm
        onSubmit={onSubmit}
        loading={loading}
        handlers={changeHandler}
        error={error}
        info={requestInfo}
        handleDismiss={handleDismiss}
      />
    </Layout>
  );
};

export default NewRequest;

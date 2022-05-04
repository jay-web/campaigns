import React, { useState, useEffect } from "react";
import Layout from "../../../../components/layout";
import { Grid, Label, Icon } from "semantic-ui-react";
import CustomButton from "../../../../components/customButton";
import { useRouter } from "next/router";

import RequestsTable from "../../../../components/requestTable";
import web3 from "../../../../utils/web3";
import campaignInstance from "../../../../utils/campaign";
import InfoMessage from "../../../../components/message";
import factory from "../../../../utils/factory";

// export async function getStaticProps({ params }) {

//   let campaign = await campaignInstance(params.campaignId);
//   let summary = await campaign.methods.getSummary().call();
//   console.log("reached here")
//   let requests = await Promise.all(
//     Array(parseInt(summary[3]))
//       .fill()
//       .map(async (value, index) => {
//         return await campaign.methods.requests(index).call();
//       })
//   );
//       console.log("here too")
//   return {
//     props:{
//       name: summary[0],
//     manager: summary[1],
//     minimumContribution: summary[2],
//     numberOfRequests: summary[3],
//     approversCount: summary[4],
//     fundReceived: summary[5],
//     description: summary[6],
//     id: params.campaignId,
//     campaign: campaign,
//     requests: requests,
//     }
//   };
// }

// export async function getStaticPaths() {
//   let cam = await factory.methods.getDeployedCampaigns().call();

//   let paths = cam.map((campaignId) => {
//     return {
//       params: {
//         campaignId: campaignId,
//       },
//     };
//   });

//   return {
//     paths: paths,
//     fallback: true,
//   };
// }

const Requests = (props) => {
  const router = useRouter();
  const id = router.query.campaignId;
  const [data, setData] = useState();
  // const { requests, approversCount, name } = data;
  const [loading, setLoading] = useState({ status: false, message: "" });
  const [error, setError] = useState({ status: false, message: "" });

  useEffect(() => {
    fetchDetails();
  }, []);

  const fetchDetails = async () => {
    const campaign = await campaignInstance(id);

    let summary = await campaign.methods.getSummary().call();

    let requests = await Promise.all(
      Array(parseInt(summary[3]))
        .fill()
        .map(async (value, index) => {
          return await campaign.methods.requests(index).call();
        })
    );

    setData({
      name: summary[0],
      manager: summary[1],
      minimumContribution: summary[2],
      numberOfRequests: summary[3],
      approversCount: summary[4],
      fundReceived: summary[5],
      description: summary[6],
      id: id,
      campaign: campaign,
      requests: requests,
    });
  };

  const submitApproval = async (index) => {
    setLoading({ status: true, message: "Transacting approving request" });
    setError({ status: false, message: "" });

    try {
      let accounts = await web3.eth.getAccounts();
      let campaign = await campaignInstance(id);

      await campaign.methods.approveRequests(index).send({ from: accounts[0] });

      setLoading({ status: false, message: "" });

      router.replace(`/campaign/${encodeURIComponent(id)}/requests`);
    } catch (err) {
      setLoading({ status: false, message: "" });
      setError({ status: true, message: err.message });
    }
  };

  const finalizeRequest = async (index) => {
    setLoading({ status: true, message: "Transacting finalize request" });
    setError({ status: false, message: "" });
    try {
      let accounts = await web3.eth.getAccounts();
      let campaign = await campaignInstance(id);

      await campaign.methods.finalizeRequest(index).send({ from: accounts[0] });

      setLoading({ status: false, message: "Transaction successfull" });
      router.replace(`/campaign/${encodeURIComponent(id)}/requests`);
    } catch (err) {
      setLoading({ status: false, message: "" });
      setError({ status: true, message: err.message });
    }
  };

  const handleDismiss = () => {
    setLoading({ status: false, message: "" });
    setError({ status: false, message: "" });
  };

  if (router.isFallback) {
    return <h1>Loading ....</h1>;
  }

  return (
    <React.Fragment>
      {data ? (
        <Layout>
          <Grid>
            <Grid.Row>
              <Grid.Column width={12}>
                <h3>Campaign :{data?.name}</h3>
                <Label style={{ marginBottom: "1rem" }}>
                  <Icon name="address card" /> {id}
                </Label>
              </Grid.Column>
              <Grid.Column width={4}>
                <CustomButton
                  content="Create Request"
                  iconName="add"
                  floated={true}
                  onSubmit={() =>
                    router.push(
                      `/campaign/${encodeURIComponent(id)}/requests/new`
                    )
                  }
                  loading={false}
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={16}>
                <RequestsTable
                  requests={data?.requests}
                  contributor={data?.approversCount}
                  onApprove={submitApproval}
                  onFinalize={finalizeRequest}
                />
                <InfoMessage
                  error={error}
                  handleDismiss={handleDismiss}
                  loading={loading}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Layout>
      ) : null}
    </React.Fragment>
  );
};

// Requests.getInitialProps = async (props) => {
//   const campaign = await campaignInstance(props.query.campaignId);

//   let summary = await campaign.methods.getSummary().call();

//   let requests = await Promise.all(
//     Array(parseInt(summary[3]))
//       .fill()
//       .map(async (value, index) => {
//         return await campaign.methods.requests(index).call();
//       })
//   );

//   return {
//     name: summary[0],
//     manager: summary[1],
//     minimumContribution: summary[2],
//     numberOfRequests: summary[3],
//     approversCount: summary[4],
//     fundReceived: summary[5],
//     description: summary[6],
//     id: props.query.campaignId,
//     campaign: campaign,
//     requests: requests,
//   };
// };

export default Requests;

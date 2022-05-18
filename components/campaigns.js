import React from "react";
import { Card, Grid } from "semantic-ui-react";
import { useRouter } from "next/router";
import Link from "next/link";
import styles from "../styles/Card.module.css";
import Image from 'next/image'

const Campaigns = (props) => {
  const router = useRouter();
  let imageURL = "https://campaigns-dapp.s3.amazonaws.com/";

  const { campaigns, campAddress } = props;

  const renderCampaigns = () => {
   
    let items = campaigns.map((campaign, index) => {
     
      let name = campaign[0];
      let address = campaign[1];
      // let minimum = campaign[2];
      // let requests = campaign[3];
      // let contributors = campaign[4];
      // let fundReceived = campaign[5];
      let description = campaign['description'];
      let deployAddress = campAddress[index];
      // let image = `${index + 1 < 4 ? index + 1 : 1}`;
      let image = campaign['imageurl'];



      return (
        
          <div key={index} className={styles.campaignBox}>
            <Image src={`${imageURL}${image}`}  alt={name} className={styles.imageStyle} height={200} width={300} />
            <div>
              <h2 className={styles.content}>{name}</h2>

              <h4 className={styles.content} >{description ? description.slice(0, 70) : null}...</h4>
            </div>
            <div>
            <button  className={styles.button}>
              <Link href={`/campaign/${encodeURIComponent(deployAddress)}`}>
                View Campaign
              </Link>
              </button>
            </div>
          </div>
          
      );
    });

    // return  <Card.Group items= {items} />
    return items;
  };

  return <> {renderCampaigns()} </>;
};

export default Campaigns;

import React from "react";
import { Card, Image } from "semantic-ui-react";
import { useRouter } from "next/router";
import Link from "next/link";

const Campaigns = (props) => {
  const router = useRouter();

  const { campaigns, campAddress } = props;
  
  const renderCampaigns = () => {
    let items = campaigns.map((campaign, index) => {
      let name = campaign[0];
      let address = campaign[1];
      // let minimum = campaign[2];
      // let requests = campaign[3];
      // let contributors = campaign[4];
      // let fundReceived = campaign[5];
      let description = campaign[6];
      let deployAddress = campAddress[index];
      let image = `${index + 1 < 4 ? index + 1 : 1}`;

      return (
        <Card key={index}>
          <Image src={`/image-${image}.jpg`} wrapped ui={false} alt={name}/>
          <Card.Content>
            <Card.Header>{name}</Card.Header>
            <Card.Meta>
              <span className="date"></span>
            </Card.Meta>
            <Card.Description>{description}</Card.Description>
          </Card.Content>
          <Card.Content extra>
          <Link href={`/campaign/${encodeURIComponent(deployAddress)}`}>
              <a>
              View Campaign
              </a>

             
            </Link>
          </Card.Content>
        </Card>
      );
    });

    // return  <Card.Group items= {items} />
    return items;
  };

  return <Card.Group> {renderCampaigns()} </Card.Group>;
};

export default Campaigns;

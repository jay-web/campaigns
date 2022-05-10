import React from "react";
import "semantic-ui-css/semantic.min.css";
import Layout from "../components/layout";
import { useRouter } from "next/router";
import { Button, Grid } from "semantic-ui-react";
import styles from "../styles/Home.module.css";
import Link from "next/link";

const Home = (props) => {
  const router = useRouter();

  return (
    <>
      <Layout>
        <div className={styles.box}>
          <div className={styles.innerBox}>
            <p >Out of the mountain of despair,</p>
            <p >a stone of hope</p>
            <h2 className={styles.message}>Create your own campaign to give fuel to your innovative ideas to fly.</h2>
            <h2 className={styles.message}>Or Contribute in some else campaign and be a part of adventure and change.</h2>
            <Link href={`/campaigns`}>
            <Button color="orange">
              Explore Campaigns
              </Button>
            </Link>
            
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Home;

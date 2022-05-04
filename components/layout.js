import React from "react";
import Header from "./header";
import { Container } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import Head from 'next/head';

const Layout = (props) => {
  return (
    <Container >
      <Head>
        <title>Crowd Funding</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Header />
      {props.children}
    </Container>
  );
};

export default Layout;

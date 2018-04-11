import React, {Component} from "react";
import Layout from "../../../../components/Layout/layout";
import AddCustomer from "./AddCustomer";

export default class Overview extends Component {
  render() {
    return (
      <Layout>
        <AddCustomer />
      </Layout>
    );
  }
}

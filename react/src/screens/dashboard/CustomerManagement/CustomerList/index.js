import React, {Component} from "react";
import Layout from "../../../../components/Layout/layout";
import List from "./CustomerList";

export default class CustomerList extends Component {
  render() {
    return (
      <Layout>
        <List />
      </Layout>
    );
  }
}

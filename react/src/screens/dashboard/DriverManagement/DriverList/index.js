import React, {Component} from "react";
import Layout from "../../../../components/Layout/layout";
import List from "./DriverList";

export default class DriverList extends Component {
  render() {
    return (
      <Layout>
        <List />
      </Layout>
    );
  }
}

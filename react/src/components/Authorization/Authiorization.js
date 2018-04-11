import React, {Component} from "react";
import _ from "lodash";
import Layout from "../Layout/layout";
import PropTypes from "prop-types";


const Authorization = (allowedRoles) => (
  (WrappedComponent) => (
  class WithAuthorization extends Component {
  static propTypes = {
  };

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const role = localStorage.getItem("userType")
    if (allowedRoles.includes(role)) {
        return <WrappedComponent {...this.props} />
      } else {
        return (
          <Layout>
             <div>you don't have access for this page</div>
         </Layout>
        )
      }
  }
}
  )
)

export default Authorization;

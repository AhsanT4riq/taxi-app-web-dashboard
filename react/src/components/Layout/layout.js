import React, { PropTypes } from "react";
import "../../styles/common/layout.scss";
import Header from "../Header";
import Sidebar from "../Sidebar";

class Layout extends React.Component {
  static propTypes = {
    //  children: PropTypes.node.isRequired
  };

  render() {
    return (
      <div className="dashboard-page dashboardPage">
        <Sidebar />
        <Header />
        <section id="bodyContainer" className="uiView">
          {this.props.children}
        </section>
      </div>
    );
  }
}

export default Layout;

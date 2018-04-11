import React, {Component} from "react";
import {Collapse} from "react-bootstrap";
import "../../styles/common/sidebar.scss";
import {Link} from "react-router-dom";
import {FormattedMessage} from "react-intl";
const dashboardIcon = require("../../resources/images/dashboardIcons/dashboardIcon.png");
const driverIcon = require("../../resources/images/dashboardIcons/driver_icon.png");
const customerIcon = require("../../resources/images/dashboardIcons/customer_icon.png");
const appConfIcon = require("../../resources/images/dashboardIcons/app_confIcon.png");

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 1,
      openDriverManagement: false,
      openCustomerManagement: false,
      openAdminArea: false
    };
  }

  render() {
    return (
      <aside className="sidebar">
        <div className="sidenav-outer sidenavOuter">
          <ul>
            <li
              className="sidemenuListTab"
              style={{
                backgroundColor:
                  this.state.activeTab === 1 ? "#1B557A" : "#184C6D"
              }}
            >
              <Link
                to="/home"
                onClick={() => {
                  this.state.activeTab = 1;
                  this.state.openCustomerManagement = false;
                  this.state.openDriverManagement = false;
                  this.state.openAdminArea = false;
                }}
              >
                <img alt="icon" src={dashboardIcon} className="topnavImgLeft" />
                <span className="title">
                  <FormattedMessage
                    id={"dashboard"}
                    defaultMessage="Dashboard"
                  />
                </span>
              </Link>
            </li>
            <li
              className="sidemenuListTab"
              style={{
                backgroundColor:
                  this.state.activeTab === 2 ? "#1B557A" : "#184C6D"
              }}
              data-toggle="collapse"
              data-target="#demo"
            >
              <a
                onClick={() => {
                  this.state.activeTab = 2;
                  this.setState({
                    openDriverManagement: !this.state.openDriverManagement,
                    openCustomerManagement: false,
                    openAdminArea: false
                  });
                }}
                style={{cursor: "pointer"}}
              >
                <img alt="icon" src={driverIcon} className="topnavImgLeft" />
                <span className="title">
                  {" "}
                  <FormattedMessage
                    id={"driver_management"}
                    defaultMessage={"Driver Management"}
                  />
                </span>
                {this.state.openDriverManagement ? (
                  <span className="text-align-right glyphicon glyphicon-minus sidemenuListAddIcon" />
                ) : (
                  <span
                    className={
                      "text-align-right glyphicon glyphicon-plus sidemenuListAddIcon"
                    }
                  />
                )}
              </a>
              <Collapse in={this.state.openDriverManagement}>
                <div>
                  <ul>
                    <li
                      className="sidemenuListTab"
                      style={{
                        backgroundColor:
                          this.state.activeTab === 2 ? "#1B557A" : "#184C6D"
                      }}
                    >
                      <Link
                        to="/driver"
                        onClick={() => {
                          this.state.activeTab = 2;
                        }}
                      >
                        <img
                          alt="icon"
                          src={customerIcon}
                          className="topnavImgLeft"
                        />
                        <span className="title">
                          {" "}
                          <FormattedMessage
                            id={"overview"}
                            defaultMessage={"Overview"}
                          />
                        </span>
                      </Link>
                    </li>
                    <li
                      className="sidemenuListTab"
                      style={{
                        backgroundColor:
                          this.state.activeTab === 2 ? "#1B557A" : "#184C6D"
                      }}
                    >
                      <Link
                        to="/driver-list"
                        onClick={() => {
                          this.state.activeTab = 2;
                        }}
                      >
                        <img
                          alt="icon"
                          src={appConfIcon}
                          className="topnavImgLeft"
                        />
                        <span className="title">
                          {" "}
                          <FormattedMessage
                            id={"drivers_list"}
                            defaultMessage={"Drivers List"}
                          />
                        </span>
                      </Link>
                    </li>
                    <li
                      className="sidemenuListTab"
                      style={{
                        backgroundColor:
                          this.state.activeTab === 2 ? "#1B557A" : "#184C6D"
                      }}
                    >
                      <Link
                        to="/add-driver"
                        onClick={() => {
                          this.state.activeTab = 3;
                        }}
                      >
                        <img
                          alt="icon"
                          src={appConfIcon}
                          className="topnavImgLeft"
                        />
                        <span className="tittle">
                          {" "}
                          <FormattedMessage
                            id={"add_driver"}
                            defaultMessage={"ADD DRIVER"}
                          />
                        </span>
                      </Link>
                    </li>
                  </ul>
                </div>
              </Collapse>
            </li>
            <li
              className="sidemenuListTab"
              style={{
                backgroundColor:
                  this.state.activeTab === 3 ? "#1B557A" : "#184C6D"
              }}
            >
              <a
                onClick={() => {
                  this.state.activeTab = 3;
                  this.setState({
                    openCustomerManagement: !this.state.openCustomerManagement,
                    openDriverManagement: false,
                    openAdminArea: false
                  });
                }}
                style={{cursor: "pointer"}}
              >
                <img alt="icon" src={customerIcon} className="topnavImgLeft" />
                <span className="title">
                  <FormattedMessage
                    id={"customer_management"}
                    defaultMessage={"Customer Management"}
                  />
                </span>
                {this.state.openCustomerManagement ? (
                  <span
                    className={
                      "text-align-right glyphicon glyphicon-minus sidemenuListAddIcon"
                    }
                  />
                ) : (
                  <span
                    className={
                      "text-align-right glyphicon glyphicon-plus sidemenuListAddIcon"
                    }
                  />
                )}
              </a>
              <Collapse in={this.state.openCustomerManagement}>
                <div>
                  <ul>
                    <li
                      className="sidemenuListTab"
                      style={{
                        backgroundColor:
                          this.state.activeTab === 3 ? "#1B557A" : "#184C6D"
                      }}
                    >
                      <Link
                        to="/customer"
                        onClick={() => {
                          this.state.activeTab = 3;
                        }}
                      >
                        <img
                          alt="icon"
                          src={customerIcon}
                          className="topnavImgLeft"
                        />
                        <span className="title">
                          <FormattedMessage
                            id={"overview"}
                            defaultMessage={"Overview"}
                          />
                        </span>
                      </Link>
                    </li>
                    <li
                      className="sidemenuListTab"
                      style={{
                        backgroundColor:
                          this.state.activeTab === 3 ? "#1B557A" : "#184C6D"
                      }}
                    >
                      <Link
                        to="/customer-list"
                        onClick={() => {
                          this.state.activeTab = 3;
                        }}
                      >
                        <img
                          alt="icon"
                          src={appConfIcon}
                          className="topnavImgLeft"
                        />
                        <span className="title">
                          {" "}
                          <FormattedMessage
                            id={"customer_list"}
                            defaultMessage={"CUSTOMER LIST"}
                          />
                        </span>
                      </Link>
                    </li>
                    <li
                      className="sidemenuListTab"
                      style={{
                        backgroundColor:
                          this.state.activeTab === 3 ? "#1B557A" : "#184C6D"
                      }}
                    >
                      <Link
                        to="/add-customer"
                        onClick={() => {
                          this.state.activeTab = 3;
                        }}
                      >
                        <img
                          alt="icon"
                          src={appConfIcon}
                          className="topnavImgLeft"
                        />
                        <span className="title">
                          {" "}
                          <FormattedMessage
                            id={"add_customer"}
                            defaultMessage={"ADD CUSTOMER"}
                          />
                        </span>
                      </Link>
                    </li>
                  </ul>
                </div>
              </Collapse>
            </li>
            <li
              className="sidemenuListTab"
              style={{
                backgroundColor:
                  this.state.activeTab === 4 ? "#1B557A" : "#184C6D"
              }}
            >
              <Link
                to="/mobile-app-configuration"
                onClick={() => {
                  this.state.activeTab = 4;
                  this.state.openCustomerManagement = false;
                  this.state.openDriverManagement = false;
                  this.state.openAdminArea = false;
                }}
              >
                <img alt="icon" src={appConfIcon} className="topnavImgLeft" />
                <span className="title">
                  {" "}
                  <FormattedMessage
                    id={"mobile_config"}
                    defaultMessage={"MOBILE APP CONFIGURATION"}
                  />
                </span>
              </Link>
            </li>
            <li
              className="sidemenuListTab"
              style={{
                backgroundColor:
                  this.state.activeTab === 4 ? "#1B557A" : "#184C6D"
              }}
            >
              <Link
                to="/server-configuration"
                onClick={() => {
                  this.state.activeTab = 4;
                  this.state.openCustomerManagement = false;
                  this.state.openDriverManagement = false;
                  this.state.openAdminArea = false;

                }}
              >
                <img alt="icon" src={appConfIcon} className="topnavImgLeft" />
                <span className="title">
                  {" "}
                  <FormattedMessage
                    id={"server_config"}
                    defaultMessage={"SERVER CONFIGURATION"}
                  />
                </span>
              </Link>
            </li>
            <li
              className="sidemenuListTab"
              style={{
                backgroundColor:
                  this.state.activeTab === 2 ? "#1B557A" : "#184C6D"
              }}
              data-toggle="collapse"
              data-target="#demo"
            >
              <a
                onClick={() => {
                  this.state.activeTab = 2;
                  this.setState({
                    openAdminArea: !this.state.openAdminArea,
                    openDriverManagement: false,
                    openCustomerManagement: false
                  });
                }}
                style={{cursor: "pointer"}}
              >
                <img alt="icon" src={customerIcon} className="topnavImgLeft" />
                <span className="title">
                 ADMIN AREA
                </span>
                {this.state.openAdminArea ? (
                  <span className="text-align-right glyphicon glyphicon-minus sidemenuListAddIcon" />
                ) : (
                  <span
                    className={
                      "text-align-right glyphicon glyphicon-plus sidemenuListAddIcon"
                    }
                  />
                )}
              </a>
              <Collapse in={this.state.openAdminArea}>
                <div>
                  <ul>
                    <li
                      className="sidemenuListTab"
                      style={{
                        backgroundColor:
                          this.state.activeTab === 2 ? "#1B557A" : "#184C6D"
                      }}
                    >
                      <Link
                        to="/admin-profile"
                        onClick={() => {
                          this.state.activeTab = 2;
                        }}
                      >
                        <img
                          alt="icon"
                          src={customerIcon}
                          className="topnavImgLeft"
                        />
                        <span className="title">
                         CHANGE PASSWORD
                        </span>
                      </Link>
                    </li>
                    <li
                      className="sidemenuListTab"
                      style={{
                        backgroundColor:
                          this.state.activeTab === 2 ? "#1B557A" : "#184C6D"
                      }}
                    >
                      <Link
                        to="/create-admin"
                        onClick={() => {
                          this.state.activeTab = 2;
                        }}
                      >
                        <img
                          alt="icon"
                          src={appConfIcon}
                          className="topnavImgLeft"
                        />
                        <span className="title">
                          CREATE ADMIN
                        </span>
                      </Link>
                    </li>
                  </ul>
                </div>
              </Collapse>
            </li>
          </ul>
        </div>
      </aside>
    );
  }
}

export default Sidebar;

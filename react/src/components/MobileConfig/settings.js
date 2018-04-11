import React, { Component } from "react";
import ToggleButton from "react-toggle-button";
import PropTypes from "prop-types";
import _ from "lodash";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import "../../styles/common/mobileapp_configuration.scss";

class settings extends Component {
  static propTypes = {
    setttingObj: PropTypes.object,
    onUpdateSetting: PropTypes.func
  };
  handleChange(value, label, updateReq) {
    this.props.setttingObj.approveConfig[label] = value;
    this.props.onUpdateSetting(
      this.props.setttingObj.approveConfig,
      "approveConfig",
      updateReq
    );
  }
  render() {
    const approveConfig = this.props.setttingObj.approveConfig;
    return (
      <div className="col-lg-5 col-md-5 col-sm-12 col-xs-12">
        <div className="panel panel-primary panelmobileApp">
          <div className="panel-heading panelheading">
            <span>Auto Approve</span>
          </div>
          <div className="panel-body panelBody">
            <ListGroup className="pannelListGroup">
              <ListGroupItem className="pannelList">
                <span>Rider</span>
                <span className="pannelListButtons">
                  <ToggleButton
                    inactiveLabel={""}
                    activeLabel={""}
                    colors={{
                      active: {
                        base: "rgb(51, 171, 240)",
                        hover: "rgb(51, 171, 240)"
                      },
                      inactive: {
                        base: "rgb(187,187,187)",
                        hover: "rgb(187,187,187)"
                      }
                    }}
                    trackStyle={{ width: 32, height: 18 }}
                    thumbStyle={{
                      width: 25,
                      height: 25,
                      alignSelf: "center",
                      marginBottom: 2
                    }}
                    thumbAnimateRange={[-15, 22]}
                    value={_.get(approveConfig, "autoApproveRider", "")}
                    onToggle={value => {
                      this.handleChange(!value, "autoApproveRider", true);
                    }}
                  />
                </span>
              </ListGroupItem>
              <ListGroupItem className="pannelList">
                <span>Driver</span>
                <span className="pannelListButtons">
                  <ToggleButton
                    inactiveLabel={""}
                    activeLabel={""}
                    colors={{
                      active: {
                        base: "rgb(51, 171, 240)",
                        hover: "rgb(51, 171, 240)"
                      },
                      inactive: {
                        base: "rgb(187,187,187)",
                        hover: "rgb(187,187,187)"
                      }
                    }}
                    trackStyle={{ width: 32, height: 18 }}
                    thumbStyle={{
                      width: 25,
                      height: 25,
                      alignSelf: "center",
                      marginBottom: 2
                    }}
                    thumbAnimateRange={[-15, 22]}
                    value={_.get(approveConfig, "autoApproveDriver", "")}
                    onToggle={value => {
                      this.handleChange(!value, "autoApproveDriver", true);
                    }}
                  />
                </span>
              </ListGroupItem>
            </ListGroup>
          </div>
        </div>
      </div>
    );
  }
}

export default settings;

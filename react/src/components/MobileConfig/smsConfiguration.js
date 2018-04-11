import React, { Component } from "react";
import ToggleButton from "react-toggle-button";
import PropTypes from "prop-types";
import {
  ListGroup,
  ListGroupItem,
  Form,
  FormGroup,
  Checkbox,
  ControlLabel
} from "react-bootstrap";
import _ from "lodash";
import "../../styles/common/mobileapp_configuration.scss";

class smsConfiguration extends Component {
  static propTypes = {
    smsObj: PropTypes.object,
    onUpdateSms: PropTypes.func
  };
  handleChange(value, label, updateReq) {
    this.props.onUpdateSms(value, label, updateReq);
  }
  handleSendOptions(value, label, updateReq) {
    this.props.smsObj.sendConfig.sms[label] = value;
    this.props.onUpdateSms(
      this.props.smsObj.sendConfig,
      "sendConfig",
      updateReq
    );
  }
  render() {
    const smsConfig = _.get(this.props, "smsObj.smsConfig", "");
    const sendoptions = _.get(this.props, "smsObj.sendConfig.sms", "");
    return (
      <div>
        <div className="col-lg-7 col-md-7 col-sm-12 col-xs-12">
          <div className="panel panel-primary panelmobileApp">
            <div className="panel-heading">
              <span>SMS Configuration</span>
            </div>
            <div className="panel-body panelBody">
              <ListGroup className="pannelListGroup">
                <ListGroupItem className="pannelList">
                  <span>Sms</span>
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
                      value={_.get(this.props, "smsObj.enableSms", "")}
                      onToggle={value => {
                        this.handleChange(!value, "enableSms", true);
                      }}
                    />
                  </span>
                </ListGroupItem>
              </ListGroup>
            </div>
          </div>
        </div>
        {this.props.smsObj.enableSms ? (
          <div className="col-lg-5 col-md-5 col-sm-12 col-xs-12">
            <div className="panel panel-primary panelsms">
              <div className="panel-heading">
                <span>Send Sms Options</span>
              </div>
              <div className="panel-body panelBody">
                <Form inline className="col-md-12 col-lg-12 col-sm-12 form">
                  <div className="row">
                    <div>
                      <span style={{ color: "#1B557A", fontWeight: "bold" }}>
                        On Trip End:
                      </span>
                    </div>
                    <FormGroup
                      controlId="formInlineName"
                      className="col-md-6 col-lg-6 col-sm-6 formgroup"
                    >
                      <ControlLabel className="col-md-8 col-lg-8 col-sm-8">
                        Driver:
                      </ControlLabel>

                      <Checkbox
                        className="col-md-4 col-lg-4 col-sm-4 checkbox"
                        checked={_.get(sendoptions, "onEndTripDriver", "")}
                        onChange={() =>
                          this.handleSendOptions(
                            !sendoptions.onEndTripDriver,
                            "onEndTripDriver",
                            true
                          )
                        }
                      />
                    </FormGroup>

                    <FormGroup
                      controlId="formInlineEmail"
                      className="col-md-6 col-lg-6 col-sm-6 formgroup"
                    >
                      <ControlLabel className="col-md-8 col-lg-8 col-sm-8 ">
                        Rider:
                      </ControlLabel>

                      <Checkbox
                        className="col-md-4 col-lg-4 col-sm-4 checkbox"
                        checked={sendoptions.onEndTripRider}
                        onChange={() =>
                          this.handleSendOptions(
                            !sendoptions.onEndTripRider,
                            "onEndTripRider",
                            true
                          )
                        }
                      />
                    </FormGroup>
                  </div>
                  <div className="row">
                    <FormGroup
                      controlId="formInlineEmail"
                      className="col-md-6 col-lg-6 col-sm-6 formgroup"
                    >
                      <ControlLabel className="col-md-8 col-lg-8 col-sm-8 ">
                        Ride Accept Rider:
                      </ControlLabel>

                      <Checkbox
                        className="col-md-4 col-lg-4 col-sm-4 checkbox"
                        checked={_.get(sendoptions, "rideAcceptRider", "")}
                        onChange={() =>
                          this.handleSendOptions(
                            !sendoptions.rideAcceptRider,
                            "rideAcceptRider",
                            true
                          )
                        }
                      />
                    </FormGroup>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}
export default smsConfiguration;

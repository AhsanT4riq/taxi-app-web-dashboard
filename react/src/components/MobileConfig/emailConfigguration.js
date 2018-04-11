import React, {Component} from "react";
import PropTypes from "prop-types";
import ToggleButton from "react-toggle-button";
import _ from "lodash";
import {
  Form,
  ListGroup,
  ListGroupItem,
  FormGroup,
  ControlLabel,
  Checkbox
} from "react-bootstrap";
import {FormattedMessage} from "react-intl";
import "../../styles/common/mobileapp_configuration.scss";

class EmailConfiguration extends Component {
  static propTypes = {
    emailObj: PropTypes.object,
    onUpdateEmail: PropTypes.func,
    enableEmail: PropTypes.bool
  };
  handleChange(value, label, updateReq) {
    this.props.onUpdateEmail(value, label, updateReq);
  }

  handleSendOptions(value, label, updateReq) {
    this.props.emailObj.sendConfig.email[label] = value;
    this.props.onUpdateEmail(
      this.props.emailObj.sendConfig,
      "sendConfig",
      updateReq
    );
  }
  render() {
    const emailConfig = _.get(this.props, "emailObj.emailConfig", "");
    const sendoptions = _.get(this.props, "emailObj.sendConfig.email", "");
    return (
      <div>
        <div className="col-lg-7 col-md-7 col-sm-12 col-xs-12">
          <div className="panel panel-primary panelmobileApp">
            <div className="panel-heading">
              <span>
                {" "}
                <FormattedMessage
                  id={"email_config"}
                  defaultMessage={"Email Configuration"}
                />
              </span>
            </div>
            <div className="panel-body">
              <ListGroup className="pannelListGroup">
                <ListGroupItem className="pannelList">
                  <span>
                    {" "}
                    <FormattedMessage id={"email"} defaultMessage={"Email"} />
                  </span>
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
                      trackStyle={{width: 32, height: 18}}
                      thumbStyle={{
                        width: 25,
                        height: 25,
                        alignSelf: "center",
                        marginBottom: 2
                      }}
                      thumbAnimateRange={[-15, 22]}
                      value={this.props.emailObj.enableEmail}
                      onToggle={value => {
                        this.handleChange(!value, "enableEmail", true);
                      }}
                    />
                  </span>
                </ListGroupItem>
              </ListGroup>
            </div>
          </div>
        </div>
        {_.get(this.props, "emailObj.enableEmail", "") ? (
          <div className="col-lg-5 col-md-5 col-sm-12 col-xs-12">
            <div className="panel panel-primary panelemail">
              <div className="panel-heading">
                <span>
                  {" "}
                  <FormattedMessage
                    id={"send_email"}
                    defaultMessage={"Send Email Options "}
                  />
                </span>
              </div>
              <div className="panel-body panelBody">
                <Form inline className="col-md-12 col-lg-12 col-sm-12 form">
                  <div className="row">
                    <div>
                      <span
                        className="mdOffset={4}"
                        style={{color: "#1B557A", fontWeight: "bold"}}
                      >
                        <FormattedMessage
                          id={"on_register"}
                          defaultMessage={"On Register"}
                        />
                      </span>
                    </div>
                    <FormGroup
                      controlId="formInlineName"
                      className="col-md-6 col-lg-6 col-sm-6 formgroup"
                    >
                      <ControlLabel className="col-md-8 col-lg-8 col-sm-8">
                        <FormattedMessage
                          id={"driver"}
                          defaultMessage={"Driver:"}
                        />
                      </ControlLabel>
                      <Checkbox
                        className="col-md-4 col-lg-4 col-sm-4 checkbox"
                        checked={sendoptions.onRegistrationDriver}
                        onChange={() =>
                          this.handleSendOptions(
                            !sendoptions.onRegistrationDriver,
                            "onRegistrationDriver",
                            true
                          )
                        }
                      />
                    </FormGroup>
                    <FormGroup
                      controlId="formInlineEmail"
                      className="col-md-6 col-lg-6 col-sm-6 formgroup"
                    >
                      <ControlLabel className="col-md-8 col-lg-8 col-sm-8">
                        {" "}
                        <FormattedMessage
                          id={"rider"}
                          defaultMessage={"Rider"}
                        />
                      </ControlLabel>
                      <Checkbox
                        className="col-md-4 col-lg-4 col-sm-4 checkbox"
                        checked={_.get(sendoptions, "onRegistrationRider", "")}
                        onChange={() =>
                          this.handleSendOptions(
                            !sendoptions.onRegistrationRider,
                            "onRegistrationRider",
                            true
                          )
                        }
                      />
                    </FormGroup>
                  </div>

                  <div className="row">
                    <div>
                      <span style={{color: "#1B557A", fontWeight: "bold"}}>
                        <FormattedMessage
                          id={"trip_end"}
                          defaultMessage={"On Trip End"}
                        />
                      </span>
                    </div>
                    <FormGroup
                      controlId="formInlineName"
                      className="col-md-6 col-lg-6 col-sm-6 formgroup"
                    >
                      <ControlLabel className="col-md-8 col-lg-8 col-sm-8">
                        <FormattedMessage
                          id={"driver"}
                          defaultMessage={"Driver:"}
                        />
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
                      <ControlLabel className="col-md-8 col-lg-8 col-sm-8">
                        <FormattedMessage
                          id={"rider"}
                          defaultMessage={"Rider:"}
                        />
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
                      <ControlLabel className="col-md-8 col-lg-8 col-sm-8">
                        <FormattedMessage
                          id={"ride_accept"}
                          defaultMessage={"Ride Accept Rider"}
                        />
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
                    <FormGroup
                      controlId="formInlineEmail"
                      className="col-md-6 col-lg-6 col-sm-6 formgroup"
                    >
                      <ControlLabel className="col-md-8 col-lg-8 col-sm-8 ">
                        <FormattedMessage
                          id={"forgot_password"}
                          defaultMessage={"On Forgot Password"}
                        />
                      </ControlLabel>

                      <Checkbox
                        className="col-md-4 col-lg-4 col-sm-4 checkbox"
                        checked={_.get(sendoptions, "onForgotPassword", "")}
                        onChange={() =>
                          this.handleSendOptions(
                            !sendoptions.onForgotPassword,
                            "onForgotPassword",
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
export default EmailConfiguration;

import React, {Component} from "react";
import {Form, FormGroup, ControlLabel, FormControl} from "react-bootstrap";
import PropTypes from "prop-types";
import _ from "lodash";
import "../../styles/common/mobileapp_configuration.scss";

class EmailSettings extends Component {
  static propTypes = {
    emailObj: PropTypes.object,
    onUpdateEmailSettings: PropTypes.func,
    enableEmail: PropTypes.bool
  };
  handleEmailConfig(value, label, updateReq) {
    if (this.props.emailObj.emailConfig) {
      this.props.emailObj.emailConfig[label] = value;
      this.props.onUpdateEmailSettings(
        this.props.emailObj.emailConfig,
        "emailConfig",
        updateReq
      );
    }
  }
  handlePort(e) {
    if (this.props.emailObj.emailConfig) {
      this.props.emailObj.emailConfig.port = e.target.value;
      if (e.target.value === "465") {
        this.props.emailObj.emailConfig.secure = true;
      } else if (e.target.value === "587") {
        this.props.emailObj.emailConfig.secure = false;
      }
    }
    this.props.onUpdateEmailSettings(
      this.props.emailObj.emailConfig,
      "emailConfig",
      true
    );
  }
  render() {
    const emailConfig = _.get(this.props, "emailObj.emailConfig", "");
    return (
      <div>
        <div className="col-lg-7 col-md-7 col-sm-12 col-xs-12">
          <div className="panel panel-primary panelmobileApp">
            <div className="panel-heading">
              <span>Email Settings</span>
            </div>
            <div className="panel-body">
              <Form inline className="col-md-12 col-lg-12 col-sm-12 form">
                <FormGroup
                  controlId="formInlineEmail"
                  className="col-md-6 col-lg-6 col-sm-6 formgroup"
                >
                  <ControlLabel className="col-md-3 col-lg-3 col-sm-3">
                    Host:
                  </ControlLabel>
                  <FormControl
                    className="col-md-8 col-lg-8 col-sm-8 formcontrol"
                    placeholder={emailConfig.host}
                    onBlur={event =>
                      this.handleEmailConfig(event.target.value, "host", true)
                    }
                  />
                </FormGroup>
                <FormGroup
                  controlId="formInlineEmail"
                  className="col-md-6 col-lg-6 col-sm-6 formgroup"
                >
                  <ControlLabel className="col-md-3 col-lg-3 col-sm-3">
                    Port:
                  </ControlLabel>
                  <FormControl
                    componentClass="select"
                    placeholder="select"
                    onChange={e => {
                      this.handlePort(e);
                    }}
                  >
                    <option value="465">465</option>
                    <option value="587">587</option>
                  </FormControl>
                </FormGroup>
                <FormGroup
                  controlId="formInlineEmail"
                  className="col-md-6 col-lg-6 col-sm-6 formgroup"
                >
                  <ControlLabel className="col-md-3 col-lg-3 col-sm-3">
                    Secure:
                  </ControlLabel>
                  {_.get(this.props, "emailObj.emailConfig.secure", "") ? (
                    <span> true </span>
                  ) : (
                    <span> false </span>
                  )}
                  <span>
                    {" "}
                    {_.get(this.props, "emailObj.emailConfig.secure", "")}{" "}
                  </span>
                </FormGroup>
                <FormGroup
                  controlId="formInlineEmail"
                  className="col-md-6 col-lg-6 col-sm-6 formgroup"
                >
                  <ControlLabel className="col-md-3 col-lg-3 col-sm-3">
                    User Name:
                  </ControlLabel>
                  <FormControl
                    className="col-md-8 col-lg-8 col-sm-8 formcontrol"
                    placeholder={emailConfig.username}
                    onBlur={event =>
                      this.handleEmailConfig(
                        event.target.value,
                        "username",
                        true
                      )
                    }
                  />
                </FormGroup>
                <FormGroup
                  controlId="formInlineEmail"
                  className="col-md-6 col-lg-6 col-sm-6 formgroup"
                >
                  <ControlLabel className="col-md-3 col-lg-3 col-sm-3">
                    Password:
                  </ControlLabel>
                  <FormControl
                    type="Password"
                    className="col-md-8 col-lg-8 col-sm-8 formcontrol"
                    placeholder={emailConfig.password ? "*********" : " "}
                    onBlur={event =>
                      this.handleEmailConfig(
                        event.target.value,
                        "password",
                        true
                      )
                    }
                  />
                </FormGroup>
              </Form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default EmailSettings;

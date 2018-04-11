import React, { Component } from "react";
import { Form, FormGroup, ControlLabel, FormControl } from "react-bootstrap";
import PropTypes from "prop-types";
import _ from "lodash";
import "../../styles/common/mobileapp_configuration.scss";

class smsSettings extends Component {
  static propTypes = {
    smsObj: PropTypes.object,
    onUpdateSmsSettings: PropTypes.func
  };
  handleSmsConfig(value, label, updateReq) {
    this.props.smsObj.smsConfig[label] = value;
    this.props.onUpdateSmsSettings(
      this.props.smsObj.smsConfig,
      "smsConfig",
      updateReq
    );
  }
  render() {
    const smsConfig = _.get(this.props, "smsObj.smsConfig", "");
    return (
      <div className="col-lg-5 col-md-5 col-sm-12 col-xs-12">
        <div className="panel panel-primary panelmobileApp">
          <div className="panel-heading">
            <span>SMS Settings</span>
          </div>
          <div className="panel-body panelBody">
            <Form
              inline
              className="col-lg-12 col-md-12 col-sm-12 col-xs-12 formemail"
            >
              <FormGroup
                controlId="formInlineEmail"
                className="col-md-12 col-lg-12 col-sm-12 formgroup"
              >
                <ControlLabel className="col-md-4 col-lg-4 col-sm-4">
                  Account Sid:
                </ControlLabel>
                <FormControl
                  type="text"
                  className="col-md-8 col-lg-8 col-sm-8 formcontrol"
                  placeholder={smsConfig.accountSid}
                  onBlur={event =>
                    this.handleSmsConfig(event.target.value, "accountSid", true)
                  }
                />
              </FormGroup>
              <FormGroup
                controlId="formInlineName"
                className="col-md-12 col-lg-12 col-sm-12 formgroup"
              >
                <ControlLabel className="col-md-4 col-lg-4 col-sm-4">
                  Auth Token:
                </ControlLabel>
                <FormControl
                  type="password"
                  className="col-md-8 col-lg-8 col-sm-8 formcontrol"
                  placeholder={smsConfig.token ? "********" : ""}
                  onBlur={event =>
                    this.handleSmsConfig(event.target.value, "token", true)
                  }
                />
              </FormGroup>
              <FormGroup
                controlId="formInlineEmail"
                className="col-md-12 col-lg-12 col-sm-12 formgroup"
              >
                <ControlLabel className="col-md-4 col-lg-4 col-sm-4">
                  MobileNo From:
                </ControlLabel>
                <FormControl
                  type="text"
                  className="col-md-8 col-lg-8 col-sm-8 formcontrol"
                  placeholder={smsConfig.from}
                  onBlur={event =>
                    this.handleSmsConfig(event.target.value, "from", true)
                  }
                />
              </FormGroup>
              <FormGroup />
            </Form>
          </div>
        </div>
      </div>
    );
  }
}
export default smsSettings;

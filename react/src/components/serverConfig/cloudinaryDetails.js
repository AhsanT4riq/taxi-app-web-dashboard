import React, { Component } from "react";
import { Form, FormGroup, ControlLabel, FormControl } from "react-bootstrap";
import PropTypes from "prop-types";
import _ from "lodash";
import "../../styles/common/mobileapp_configuration.scss";

class cloudinaryDetails extends Component {
  static propTypes = {
    cloudinaryObj: PropTypes.object,
    onUpdateCloudinaryDetails: PropTypes.func
  };
  handlecloudinaryConfig(value, label, updateReq) {
    this.props.cloudinaryObj.cloudinaryConfig[label] = value;
    this.props.onUpdateCloudinaryDetails(
      this.props.cloudinaryObj.cloudinaryConfig,
      "cloudinaryConfig",
      updateReq
    );
  }
  render() {
    const cloudinaryConfig = _.get(
      this.props,
      "cloudinaryObj.cloudinaryConfig",
      ""
    );
    return (
      <div className="col-lg-7 col-md-7 col-sm-12 col-xs-12">
        <div className="panel panel-primary panelmobileApp">
          <div className="panel-heading">
            <span>Cloudinary Details</span>
          </div>
          <div className="panel-body panelBody">
            <Form
              inline
              className="col-lg-12 col-md-12 col-sm-12 col-xs-12 formemail"
            >
              <FormGroup
                className="col-md-12 col-lg-12 col-sm-12 formgroup"
              >
                <ControlLabel className="col-md-4 col-lg-4 col-sm-4">
                  Cloud Name:
                </ControlLabel>
                <FormControl
                  type="text"
                  className="col-md-8 col-lg-8 col-sm-8 formcontrol"
                  placeholder={cloudinaryConfig.cloud_name}
                  onBlur={event =>
                    this.handlecloudinaryConfig(
                      event.target.value,
                      "cloud_name",
                      true
                    )
                  }
                />
              </FormGroup>
              <FormGroup
                className="col-md-12 col-lg-12 col-sm-12 formgroup"
              >
                <ControlLabel className="col-md-4 col-lg-4 col-sm-4">
                  Api Key:
                </ControlLabel>
                <FormControl
                  type="text"
                  className="col-md-8 col-lg-8 col-sm-8 formcontrol"
                  placeholder={cloudinaryConfig.api_key}
                  onBlur={event =>
                    this.handlecloudinaryConfig(
                      event.target.value,
                      "api_key",
                      true
                    )
                  }
                />
              </FormGroup>
              <FormGroup
                className="col-md-12 col-lg-12 col-sm-12 formgroup"
              >
                <ControlLabel className="col-md-4 col-lg-4 col-sm-4">
                  Api Secret:
                </ControlLabel>
                <FormControl
                  type="Password"
                  className="col-md-8 col-lg-8 col-sm-8 formcontrol"
                  placeholder={cloudinaryConfig.api_secret ? "**********" : ""}
                  onBlur={event =>
                    this.handlecloudinaryConfig(
                      event.target.value,
                      "api_secret",
                      true
                    )
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
export default cloudinaryDetails;

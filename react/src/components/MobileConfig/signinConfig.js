import React, { Component } from "react";
import ToggleButton from "react-toggle-button";
import PropTypes from "prop-types";
import {
  ListGroup,
  ListGroupItem,
  Form,
  FormGroup,
  FormControl,
  ControlLabel
} from "react-bootstrap";
import _ from "lodash";
import "../../styles/common/mobileapp_configuration.scss";

class signinConfig extends Component {
  static propTypes = {
    signinObj: PropTypes.object,
    onUpdateSignin: PropTypes.func,
    enableGoogle: PropTypes.bool,
    enableFacebook: PropTypes.bool
  };
  constructor(props) {
    super(props);
    this.state = {
      google: true,
      facebook: false,
      tgoogle: _.get(this.props, "signinObj.enableGoogle", ""),
      tfb: _.get(this.props, "signinObj.enableFacebook", "")
    };
  }
  handleChange(value, label, updateReq) {
    if (label === "enableGoogle") {
      this.setState({
        google: !this.state.google,
        tgoogle: !this.state.tgoogle
      });
    } else if (label === "enableFacebook") {
      this.setState({ facebook: !this.state.facebook, tfb: !this.state.tfb });
    }
    this.props.onUpdateSignin(value, label, updateReq);
  }
  googleAuthUpdate(value, label, updateReq) {
    this.props.signinObj.googleAuth[label] = value;
    this.props.onUpdateSignin(
      this.props.signinObj.googleAuth,
      "googleAuth",
      updateReq
    );
  }
  facebookAuthUpdate(value, label, updateReq) {
    this.props.signinObj.facebookAuth[label] = value;
    this.props.onUpdateSignin(
      this.props.signinObj.facebookAuth,
      "googleAuth",
      updateReq
    );
  }
  render() {
    const googleAuth = _.get(this.props, "signinObj.googleAuth", "");
    const facebookAuth = _.get(this.props, "signinObj.facebookAuth", "");
    return (
      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
        <div
          className="col-lg-7 col-md-7 col-sm-12 col-xs-12"
          style={{ paddingLeft: 0 }}
        >
          <div className="panel panel-primary panelmobileApp">
            <div className="panel-heading">
              <span>Signin Config</span>
            </div>
            <div className="panel-body panelBody">
              <ListGroup className="pannelListGroup">
                <ListGroupItem className="pannelList">
                  <span>google</span>
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
                      value={_.get(this.props, "signinObj.enableGoogle", "")}
                      onToggle={value => {
                        this.handleChange(!value, "enableGoogle", true);
                      }}
                    />
                  </span>
                </ListGroupItem>
                <ListGroupItem className="pannelList">
                  <span>Facebook</span>
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
                      value={_.get(this.props, "signinObj.enableFacebook", "")}
                      onToggle={value => {
                        this.handleChange(!value, "enableFacebook", true);
                      }}
                    />
                  </span>
                </ListGroupItem>
              </ListGroup>
            </div>
          </div>
        </div>
        {this.props.signinObj.enableGoogle ? (
          <div
            className="col-lg-5 col-md-5 col-sm-12 col-xs-12"
            style={{ paddingRight: 0 }}
          >
            <div className="panel panel-primary panelmobileApp">
              <div className="panel-heading">
                <span>Google Authentication</span>
              </div>
              <div className="panel-body panelBody">
                <Form inline className="col-md-12 col-lg-12 col-sm-12 form">
                  <FormGroup
                    controlId="formInlineName"
                    className="col-md-10 col-lg-10 col-sm-10 formgroup"
                  >
                    <ControlLabel className="col-md-4 col-lg-4 col-sm-4 ">
                      {" "}
                      android Client Id<span style={{ color: "red" }}>*</span>:
                    </ControlLabel>

                    <FormControl
                      className="col-md-8 col-lg-8 col-sm-8 formcontrol"
                      placeholder={_.get(googleAuth, "androidClientId", "")}
                      onBlur={event =>
                        this.googleAuthUpdate(
                          event.target.value,
                          "androidClientId",
                          true
                        )
                      }
                    />
                  </FormGroup>
                  <FormGroup
                    controlId="formInlineName"
                    className="col-md-10 col-lg-10 col-sm-10 formgroup"
                  >
                    <ControlLabel className="col-md-4 col-lg-4 col-sm-4 ">
                      {" "}
                      ios Client Id<span style={{ color: "red" }}>*</span>:
                    </ControlLabel>

                    <FormControl
                      className="col-md-8 col-lg-8 col-sm-8 formcontrol"
                      placeholder={_.get(googleAuth, "iosClientId", "")}
                      onBlur={event =>
                        this.googleAuthUpdate(
                          event.target.value,
                          "iosClientId",
                          true
                        )
                      }
                    />
                  </FormGroup>
                </Form>
              </div>
            </div>
          </div>
        ) : null}
        {this.props.signinObj.enableFacebook ? (
          <div
            className="col-lg-5 col-md-5 col-sm-12 col-xs-12"
            style={{ paddingRight: 0 }}
          >
            <div className="panel panel-primary panelmobileApp">
              <div className="panel-heading">
                <span>Facebook Authentication</span>
              </div>
              <div className="panel-body panelBody">
                <Form inline className="col-md-12 col-lg-12 col-sm-12 form">
                  <FormGroup
                    controlId="formInlineName"
                    className="col-md-10 col-lg-10 col-sm-10 formgroup"
                  >
                    <ControlLabel className="col-md-4 col-lg-4 col-sm-4 ">
                      {" "}
                      Facebook App Id<span style={{ color: "red" }}>*</span>:
                    </ControlLabel>

                    <FormControl
                      className="col-md-8 col-lg-8 col-sm-8 formcontrol"
                      placeholder={_.get(facebookAuth, "authToken", "")}
                      onBlur={event =>
                        this.facebookAuthUpdate(
                          event.target.value,
                          "authToken",
                          true
                        )
                      }
                    />
                  </FormGroup>
                </Form>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}
export default signinConfig;

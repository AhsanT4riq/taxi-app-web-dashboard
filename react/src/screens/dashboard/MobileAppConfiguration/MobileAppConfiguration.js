import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import { Form, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import PropTypes from "prop-types";
import Toast from "../../../components/Toast";
import Settings from "../../../components/MobileConfig/settings";
import EmailConfiguration from "../../../components/MobileConfig//emailConfigguration";
import SmsConfiguration from "../../../components/MobileConfig//smsConfiguration";
import TripPriceCalculation from "../../../components/MobileConfig//tripPriceCalaculation";
import Payment from "../../../components/MobileConfig//payment";
import SigninConfig from "../../../components/MobileConfig//signinConfig";
import AppCofigAction from "../../../redux/appConfiguration/action";
import "../../../styles/common/mobileapp_configuration.scss";

class AppConfiguration extends Component {
  static propTypes = {
    configObj: PropTypes.object,
    fetchAppConfig: PropTypes.func,
    createAppConfig: PropTypes.func,
    loadingConfig: PropTypes.bool,
    failedUpdateConfig: PropTypes.bool
  };
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
      userObj: {
        enableEmail: false,
        enableSms: false,
        sendConfig: {
          email: {
            onForgotPassword: true,
            onRegistrationRider: true,
            onRegistrationDriver: true,
            onEndTripRider: true,
            onEndTripDriver: true,
            rideAcceptRider: true
          },
          sms: {
            onEndTripRider: true,
            onEndTripDriver: true,
            rideAcceptRider: true
          }
        },
        approveConfig: {
          autoApproveRider: true,
          autoApproveDriver: true
        },
        tripPrice: {
          currencySymbol: "$",
          baseFare: 0,
          farePerKm: 0,
          farePerMin: 0
        },
        stripe: true,
        stripeConfig: {
          stripekey: null
        },
        cash: true,
        enableGoogle: true,
        googleAuth: {
          androidClientId:
            "805539794872-jb1vv12mh1k90fpuo7ki3cku1ietb30e.apps.googleusercontent.com",
          iosClientId:
            "805539794872-s9o2jt8l5er0mp5uidj9ak0f1h3chpqp.apps.googleusercontent.com"
        },
        enableFacebook: true,
        facebookAuth: {
          authToken: "1919559661598816"
        },
        googleMapsApiKey: "AIzaSyA6appwty3Vn3I9OnSDX-w7-ceBT_Uc1tc"
      }
    };
    this.configUpdate = this.configUpdate.bind(this);
  }
  componentWillMount() {
    this.props.fetchAppConfig();
  }
  componentWillReceiveProps(nextProps) {
    const newAppConfig = Object.assign({}, nextProps.configObj);
    if (!_.isEmpty(newAppConfig)) {
      this.setState({ userObj: newAppConfig });
    }
  }
  configUpdate = (configUpdate, text, req) => {
    const newObj = _.isEmpty(this.props.configObj)
      ? this.state.userObj
      : this.props.configObj;
    newObj[text] = configUpdate;
    this.setState({ userObj: newObj, edit: req });
    const userObj = this.state.userObj;
    if (req === true) {
      this.props.createAppConfig(newObj);
    }
  };
  render() {
    return (
      <div className="animate">
        <div>
          {this.props.failedUpdateConfig && this.state.edit ? (
            <Toast
              message="Updation failed! Try again"
              showToast
              delay={1000}
            />
          ) : null}
          {this.props.failedUpdateConfig === false &&
          this.state.edit === true ? (
              <Toast message="Updated Successfully" showToast delay={1000} />
            ) : null}
        </div>
        {this.props.loadingConfig ? null : (
          <div>
            <div>
              <div className="row">
                <TripPriceCalculation
                  tripObj={this.props.configObj}
                  onUpdateTrip={this.configUpdate}
                />
                <Settings
                  setttingObj={this.props.configObj}
                  onUpdateSetting={this.configUpdate}
                />
                <EmailConfiguration
                  emailObj={this.props.configObj}
                  onUpdateEmail={this.configUpdate}
                />
              </div>
              <div className="row">
                <SmsConfiguration
                  smsObj={this.props.configObj}
                  onUpdateSms={this.configUpdate}
                />
              </div>
              <div
                className="col-lg-12 col-md-12 col-sm-12 col-xs-12"
                style={{ paddingRight: 0, paddingLeft: 0 }}
              >
                <div className="panel panel-primary panelmobileApp">
                  <div className="panel-heading">
                    <span>Google Maps Api Key</span>
                  </div>
                  <div className="panel-body panelBody">
                    <Form inline className="col-md-12 col-lg-12 col-sm-12 form">
                      <FormGroup
                        controlId="formInlineName"
                        className="col-md-12 col-lg-12 col-sm-12 formgroup"
                      >
                        <ControlLabel className="col-md-2 col-lg-2 col-sm-2 ">
                          apiKey<span style={{ color: "red" }}>*</span>:{" "}
                        </ControlLabel>

                        <FormControl
                          className="col-md-8 col-lg-8 col-sm-8 formcontrol"
                          placeholder={this.props.configObj.googleMapsApiKey}
                          onChange={event =>
                            this.configUpdate(event, "googleMapsApiKey", false)
                          }
                          onBlur={event =>
                            this.configUpdate(
                              event.target.value,
                              "googleMapsApiKey",
                              true
                            )
                          }
                        />
                      </FormGroup>
                    </Form>
                  </div>
                </div>
              </div>
              <div className="row">
                <Payment
                  payObj={this.props.configObj}
                  onUpdatePay={this.configUpdate}
                />
              </div>
              <div className="row">
                <SigninConfig
                  signinObj={this.props.configObj}
                  onUpdateSignin={this.configUpdate}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    configObj: state.configDetails.configObj,
    loadingConfig: state.configDetails.loadingConfig,
    failedUpdateConfig: state.configDetails.failedUpdateConfig
  };
}
function bindActions(dispatch) {
  return {
    fetchAppConfig: () => dispatch(AppCofigAction.fetchAppConfig()),
    createAppConfig: userObj =>
      dispatch(AppCofigAction.createAppConfig(userObj))
  };
}

export default connect(mapStateToProps, bindActions)(AppConfiguration);

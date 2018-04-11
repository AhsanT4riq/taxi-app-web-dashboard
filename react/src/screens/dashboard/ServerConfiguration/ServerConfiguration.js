import React, {Component} from "react";
import {connect} from "react-redux";
import _ from "lodash";
import PropTypes from "prop-types";
import Toast from "../../../components/Toast";
import ServerCofigAction from "../../../redux/serverConfiguration/action";
import EmailSettings from "../../../components/serverConfig/emailSetting";
import SmsSettings from "../../../components/serverConfig/smsSettings";
import CloudinaryDetails from "../../../components/serverConfig/cloudinaryDetails";


class ServerConfiguration extends Component {
  static propTypes = {
    configObj: PropTypes.object,
    fetchServerConfig: PropTypes.func,
    createServerConfig: PropTypes.func,
    loadingConfig: PropTypes.bool,
    failedUpdateConfig: PropTypes.bool
  };
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
      serverObj: {
        emailConfig: {
          host: "smtp.gmail.com",
          port: 465,
          secure: true, // secure:true for port 465, secure:false for port 587
          username: "@gmail.com",
          password: ""
        },
        smsConfig: {
          accountSid: "",
          token: "",
          from: ""
        },
        cloudinaryConfig: {
          cloud_name: "",
          api_key: "",
          api_secret: ""
        }
      }
    };
    this.configUpdate = this.configUpdate.bind(this);
  }
  componentWillMount() {
    this.props.fetchServerConfig();
  }
  componentWillReceiveProps(nextProps) {
    const newServerConfig = Object.assign({}, nextProps.configObj);
    if (!_.isEmpty(newServerConfig)) {
      this.setState({serverObj: newServerConfig});
    }
  }

  configUpdate = (configUpdate, text, req) => {
    const newObj = _.isEmpty(this.props.configObj)
      ? this.state.serverObj
      : this.props.configObj;
    newObj[text] = configUpdate;
    this.setState({serverObj: newObj, edit: req});
    const serverObj = this.state.serverObj;
    if (req === true) {
      this.props.createServerConfig(newObj);
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
          <EmailSettings
            emailObj={
              _.isEmpty(this.props.configObj)
                ? this.state.serverObj
                : this.props.configObj
            }
            onUpdateEmailSettings={this.configUpdate}
          />
          <SmsSettings
            smsObj={
              _.isEmpty(this.props.configObj)
                ? this.state.serverObj
                : this.props.configObj
            }
            onUpdateSmsSettings={this.configUpdate}
          />
          <CloudinaryDetails
            cloudinaryObj={
              _.isEmpty(this.props.configObj)
                ? this.state.serverObj
                : this.props.configObj
            }
            onUpdateCloudinaryDetails={this.configUpdate}
          />
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    configObj: state.serverconfigDetails.configObj,
    loadingConfig: state.serverconfigDetails.loadingConfig,
    failedUpdateConfig: state.serverconfigDetails.failedUpdateConfig
  };
}

function bindActions(dispatch) {
  return {
    fetchServerConfig: () => dispatch(ServerCofigAction.fetchServerConfig()),
    createServerConfig: serverObj =>
      dispatch(ServerCofigAction.createServerConfig(serverObj))
  };
}

export default connect(mapStateToProps, bindActions)(ServerConfiguration);

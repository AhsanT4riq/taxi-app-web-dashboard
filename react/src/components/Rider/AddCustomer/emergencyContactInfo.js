import React, { Component } from "react";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";
import "../../../styles/common/add_customer.scss";
import EmergencyContactInfoForm from "./emergencyContactInfoForm";

class EmergencyContactInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emergencyDetails: {
        phone: null,
        name: null
      }
    };
  }

  static propTypes = {
    emergencyobj: PropTypes.object,
    onUpdateEmergencyInfo: PropTypes.func
  };
  handleChange(inputname, value) {
    if (inputname === "name") {
      this.state.emergencyDetails["name"] = value;
    } else if (inputname === "phone") {
      this.state.emergencyDetails["phone"] = value;
    }
    this.props.onUpdateEmergencyInfo(
      "emergencyDetails",
      this.state.emergencyDetails
    );
  }
  render() {
    return (
      <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
        <div className="panel panel-primary adddCustomerpanel">
          <div className="panel-heading">
            <span>
              {" "}
              <FormattedMessage
                id={"emergency_contact"}
                defaultMessage={"Emergency Contact Info"}
              />
            </span>
          </div>
          <div className="panel-body">
            <EmergencyContactInfoForm
              OnformBlur={(name, val) => this.handleChange(name, val)}
            />
          </div>
        </div>
      </div>
    );
  }
}
export default EmergencyContactInfo;

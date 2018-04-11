import React, { Component } from "react";
import { Form, FormGroup, ControlLabel, FormControl } from "react-bootstrap";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";
import "../../../styles/common/add_driver.scss";
import BankInfoForm from "./bankInfoForm";

class BadgeInfo extends Component {
  static propTypes = {
    bankobj: PropTypes.object,
    onUpdateBankInfo: PropTypes.func
  };
  constructor(props) {
    super(props);
    this.state = {
      bankDetails: {
        accountNo: null,
        holderName: null,
        IFSC: null
      }
    };
  }
  handleChange(inputname, value) {
    this.state.bankDetails[inputname] = value;
    this.props.onUpdateBankInfo("bankDetails", this.state.bankDetails);
  }
  handleIssueDate(label) {
    const date = `${this.state.Imm}/${this.state.Idd}/${this.state.Iyyyy}`;
    this.props.onUpdateBadgeInfo(date, label, true);
  }
  handleExpDate(label) {
    const date = `${this.state.Emm}/${this.state.Edd}/${this.state.Eyyyy}`;
    this.props.onUpdateBadgeInfo(date, label, true);
  }
  render() {
    return (
      <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
        <div className="panel panel-primary adddriverpanel" style={{height: 350}}>
          <div className="panel-heading">
            <FormattedMessage id={"bank_info"} defaultMessage={"Bank Info"} />
          </div>
          <div className="panel-body">
            <BankInfoForm
              OnformBlur={(name, val) => this.handleChange(name, val)}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default BadgeInfo;

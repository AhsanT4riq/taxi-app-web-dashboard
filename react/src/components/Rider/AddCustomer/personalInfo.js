import React, {Component} from "react";
import {Form, FormGroup, ControlLabel, FormControl} from "react-bootstrap";
import PropTypes from "prop-types";
import {FormattedMessage} from "react-intl";
import Toast from "../../Toast";
import "../../../styles/common/add_customer.scss";
import PersonalInfoForm from "./personalInfoForm";

class PersonalInfo extends Component {
  static propTypes = {
    personalobj: PropTypes.object,
    onUpdatePersonalInfo: PropTypes.func
  };
  constructor(props) {
    super(props);
    this.state = {
      mm: null,
      dd: null,
      yyyy: null,
      pwd: null,
      cpwd: null,
      pstate: false
    };
  }
  handleChange(inputname, value) {
    if (inputname === "month") {
      this.setState({mm: value});
      const date = `${this.state.mm}/${this.state.dd}/${this.state.yyyy}`;
    } else if (inputname === "date") {
      this.setState({dd: value});
      const date = `${this.state.mm}/${this.state.dd}/${this.state.yyyy}`;
    } else if (inputname === "year") {
      this.setState({yyyy: value});
      const date = `${this.state.mm}/${this.state.dd}/${value}`;

      this.props.onUpdatePersonalInfo("dob", date);
    } else {
      this.props.onUpdatePersonalInfo(inputname, value);
    }
  }
  handleDate() {
    const date = `${this.state.mm} /${this.state.dd}/${this.state.yyyy}`;
    this.props.onUpdatePersonalInfo(date, "dob", true);
  }
  handlePassword() {
    if (this.state.pwd === this.state.cpwd) {
      this.props.onUpdatePersonalInfo(this.state.pwd, "password", true);
      this.setState({pstate: false});
    } else {
      this.setState({pstate: true});
      <Toast message="Passwords doesnot match" showToast delay={1000} />;
    }
  }
  render() {
    return (
      <div className="col-lg-8 col-md-8 col-sm-12 col-xs-12">
        <div>
          {this.state.pstate ? (
            <Toast message="Passwords doesnot match" showToast delay={1000} />
          ) : null}
        </div>
        <div className="panel panel-primary adddCustomerpanel">
          <div className="panel-heading">
            <span>
              <FormattedMessage
                id={"personal_info"}
                defaultMessage={"Personal Info"}
              />
            </span>
          </div>
          <div className="panel-body">
            <PersonalInfoForm
              OnformBlur={(name, val) => this.handleChange(name, val)}
            />
          </div>
        </div>
      </div>
    );
  }
}
export default PersonalInfo;

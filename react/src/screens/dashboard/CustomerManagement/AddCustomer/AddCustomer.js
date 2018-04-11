import React, {Component} from "react";
import {connect} from "react-redux";
import {FormattedMessage} from "react-intl";
import {Button} from "react-bootstrap";
import {withRouter} from "react-router-dom";
import PropTypes from "prop-types";
import Toast from "../../../../components/Toast";
import UserAction from "../../../../redux/users/action";
import PersonalInfo from "../../../../components/Rider/AddCustomer/personalInfo";
import EmergencyContactInfo from "../../../../components/Rider/AddCustomer/emergencyContactInfo";

class AddCustomer extends Component {
  static propTypes = {
    createUser: PropTypes.func,
    newUserObj: PropTypes.any,
    createUserErrorObj: PropTypes.any,
    failedCreateUserApi: PropTypes.any
  };
  constructor(props) {
    super(props);
    this.state = {
      userObj: {
        userType: "rider",
        fname: null,
        lname: null,
        password: null,
        email: null,
        phoneNo: null,
        dob: null,
        bloodGroup: null,
        emergencyDetails: {
          phone: null,
          name: null
        }
      },
      toast: false
    };
    this.customerUpdate = this.customerUpdate.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.newUserObj.success) {
      this.props.history.push("/Home");
    }
  }
  customerUpdate = (name, val) => {
    const newObj = this.state.userObj;
    newObj[name] = val;
    this.setState({userObj: newObj, toast: false});
    const userObj = this.state.userObj;
  };
  createCustomer() {
    const userobj = this.state.userObj;
    this.props.createUser(userobj);
    this.state.toast = true;
  }
  render() {
    return (
      <div>
        {this.props.newUserObj.success && this.state.toast ? (
          <Toast
            message={this.props.newUserObj.message}
            showToast
            delay={1000}
          />
        ) : null}
        {this.props.failedCreateUserApi && this.state.toast ? (
          <Toast message="user creation failed" showToast delay={1000} />
        ) : null}
        <div className="row">
          <PersonalInfo
            personalobj={this.state.userObj}
            onUpdatePersonalInfo={this.customerUpdate}
          />
          <EmergencyContactInfo
            emergencyobj={this.state.userObj}
            onUpdateEmergencyInfo={this.customerUpdate}
          />
        </div>
        <div className="row">
          <Button
            style={{display: "block", marginLeft: "50%"}}
            bsStyle="primary"
            onClick={() => this.createCustomer()}
          >
            {" "}
            <FormattedMessage
              id={"add_customer"}
              defaultMessage={"ADD CUSTOMER"}
            />
          </Button>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    newUserLoading: state.users.newUserLoading,
    failedCreateUserApi: state.users.failedCreateUserApi,
    createUserErrorObj: state.users.createUserErrorObj,
    newUserObj: state.users.newUserObj
  };
}

function bindActions(dispatch) {
  return {
    createUser: userObj => dispatch(UserAction.createNewUser(userObj))
  };
}
export default withRouter(connect(mapStateToProps, bindActions)(AddCustomer));

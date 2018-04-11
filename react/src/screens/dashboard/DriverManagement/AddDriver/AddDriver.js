import React, {Component} from "react";
import {connect} from "react-redux";
import {Button} from "react-bootstrap";
import PropTypes from "prop-types";
import {withRouter} from "react-router-dom";
import Toast from "../../../../components/Toast";
import UserAction from "../../../../redux/users/action";
import PersonalInfo from "../../../../components/Driver/AddDriver/personalInfo";
import LIcenceInfo from "../../../../components/Driver/AddDriver/licenceinfo";
import VehicleInfo from "../../../../components/Driver/AddDriver/vechileInfo";
import BankInfo from "../../../../components/Driver/AddDriver/bankinfo";

class AddDriver extends Component {
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
        userType: "driver",
        fname: null,
        lname: null,
        password: null,
        email: null,
        phoneNo: null,
        dob: null,
        bloodGroup: null,
        vehicleDocuments: {
          insuranceUrl: null,
          rcBookUrl: null,
        },
        licenceDocuments:{
          licenceUrl: null,
          vechilePaperUrl: null,
        },
        licenceDetails: {
          licenceNo: null,
          issueDate: null,
          expDate: null
        },
        carDetails: {
          type: null,
          company: null,
          regNo: null,
          RC_ownerName: null,
          vehicleNo: null,
          carModel: null
        },
        bankDetails: {
          accountNo: null,
          holderName: null,
          IFSC: null
        }
      },
      toast: false,
    };
    this.driverUpdate = this.driverUpdate.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.newUserObj.success) {
      this.props.history.push("/Home");
    }
  }
  driverUpdate = (name, val) => {
    const newObj = this.state.userObj;
    newObj[name] = val;
    this.setState({userObj: newObj, toast: false});
    const userObj = this.state.userObj;
  };
  createDriver() {
    const userobj = this.state.userObj;
    this.props.createUser(userobj);
    this.state.toast = true;
  }
  render() {
    return (
      <div className={"row animate"}>
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
        </div>
        <div className="row">
          <PersonalInfo
            personalobj={this.state.userObj}
            onUpdatePersonalInfo={this.driverUpdate}
          />
          <BankInfo
            bankobj={this.state.userObj}
            onUpdateBankInfo={this.driverUpdate}
          />
        </div>
        <div className="row">
          <VehicleInfo
            vehicleobj={this.state.userObj}
            onUpdateVehicleInfo={this.driverUpdate}
          />
          <LIcenceInfo
            licenceobj={this.state.userObj}
            onUpdateLicenceInfo={this.driverUpdate}
          />
        </div>
        <div className="row">
          <Button
            style={{display: "block", marginLeft: "50%"}}
            bsStyle="primary"
            onClick={() => this.createDriver()}
          >
            {" "}
            ADD DRIVER{" "}
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
export default withRouter(connect(mapStateToProps, bindActions)(AddDriver));

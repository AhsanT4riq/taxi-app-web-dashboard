import React, {Component} from "react";
import _ from "lodash";
import {connect} from "react-redux";
import UserAction from "../../../../redux/users/action";
import Toast from "../../../../components/Toast";
import PropTypes from "prop-types";
import AdminProfileForm from "./AdminProfileForm";

class AdminProfile extends Component {
  static propTypes = {
  };

  constructor(props) {
    super(props);
    this.state = {
      data: {
        password: null,
        oldpassword: null
      },
      toast: false
    };
  }

   changePassword = values => {
    this.state.data['password'] = values.newpassword,
    this.state.data['oldpassword'] = values.oldpassword,
    this.props.changePassword(this.state.data);
    this.state.toast = true;
  };

  render() {
    return (
      <div className="animate ">
       {this.props.successChangePassword && this.state.toast ? (
          <Toast
            message={this.props.changePwdObj.message}
            showToast
            delay={1000}
          />
        ) : null}
        {this.props.failedChangePassword && this.state.toast ? (
           <Toast
            message={this.props.changePwdObj.message === "Unauthorized" ? 'Incorrect old password' : this.props.changePwdObj.message}
            showToast
            delay={1000}
          />
        ) : null}
        <div className="row">
          <div className="col-md-6 col-lg-6 col-sm-6 panel panel-primary adddCustomerpanel" style={{padding: 0}}>
            <div className="panel-heading">
              <span>
                Change Password
              </span>
            </div>
            <div className="panel-body">
              <AdminProfileForm onSubmitPassword={this.changePassword}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    failedChangePassword: state.users.failedChangePassword,
    successChangePassword: state.users.successChangePassword,
    changePwdObj: state.users.changePwdObj
  };
}

function bindActions(dispatch) {
  return {
    changePassword: pwds => dispatch(UserAction.changePassword(pwds))
  };
}
export default connect(mapStateToProps, bindActions)(AdminProfile);

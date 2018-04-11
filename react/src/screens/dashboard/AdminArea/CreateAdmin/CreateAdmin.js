import React, {Component} from "react";
import _ from "lodash";
import {connect} from "react-redux";
import UserAction from "../../../../redux/users/action";
import Toast from "../../../../components/Toast";
import PropTypes from "prop-types";
import CreateAdminForm from "./CreateAdminForm";

class CreateAdmin extends Component {
  static propTypes = {
  };

  constructor(props) {
    super(props);
    this.state = {
       userObj: {
        userType: "admin",
        fname: null,
        lname: null,
        phoneNo: null,
        password: null,
        email: null,
      },
      toast: false
    };
  }

   createAdmin = values => {
   this.state.userObj['fname'] = values.firstname,
   this.state.userObj['lname'] = values.lastname,
   this.state.userObj['phoneNo'] = values.phonenumber,
   this.state.userObj['password'] = values.password,
   this.state.userObj['email'] = values.emailid,
   this.props.createUser(this.state.userObj);
   this.state.toast = true;
  };

  render() {
    return (
      <div className="animate ">
        {this.props.newUserObj.success && this.state.toast ? (
          <Toast
            message="Admin Created Successfully"
            showToast
            delay={1000}
          />
        ) : null}
        {this.props.failedCreateUserApi && this.state.toast ? (
          <Toast message="Admin creation failed" showToast delay={1000} />
        ) : null}
        <div className="row">
          <div className="col-md-6 col-lg-6 col-sm-6 panel panel-primary adddCustomerpanel" style={{padding: 0, height: 400}}>
            <div className="panel-heading">
              <span>
                Create Admin
              </span>
            </div>
            <div className="panel-body">
              <CreateAdminForm Onsubmitadmin={this.createAdmin} />
            </div>
          </div>
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
// export default CreateAdmin;
export default connect(mapStateToProps, bindActions)(CreateAdmin);

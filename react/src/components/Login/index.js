import React, {Component} from "react";
import {connect} from "react-redux";
import {FormattedMessage} from "react-intl";
import {geolocated} from "react-geolocated";
import {FormGroup, FormControl} from "react-bootstrap";
import PropTypes from "prop-types";
import {withRouter} from "react-router-dom";
import {loginUser, setGPS} from "../../redux/auth/action";

import "../../styles/common/login.scss";

import logo from "../../resources/images/Taxi-Icon.jpg";
const translations = {};
class Login extends Component {
  static propTypes = {
    loginUser: PropTypes.func,
    user: PropTypes.any,
    invalidCreatential: PropTypes.bool,
    loggedInStatus: PropTypes.bool
  };

  constructor(props) {
    super(props);
    this.state = {
      email: "superAdmin@taxiApp.com",
      password: "Password"
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePassowrd = this.handlePassowrd.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user.jwtAccessToken) {
      localStorage.setItem("id_token", nextProps.user.jwtAccessToken);
      localStorage.setItem("userType", nextProps.user.user.userType);
      if (nextProps.user && nextProps.user.jwtAccessToken) {
        this.props.history.push("/Home");
      }
    }
    if (nextProps.coords) {
      this.props.setCoords(nextProps.coords);
    }
  }

  handleEmail(e) {
    this.setState({
      email: e.target.value
    });
  }

  handlePassowrd(e) {
    this.setState({
      password: e.target.value
    });
  }

  handleLogin(e) {
    e.preventDefault();
    this.props.loginUser(this.state);
    return false;
  }

  render() {
    return (
      <div className="login-page animate loginPage">
        <div className="loginForm">
          <img src={logo} alt="flat Avatar" className="user-avatar" />
          <h1>Taxi App Dashboard {this.state.invalidCredential}</h1>
          {this.props.invalidCreatential ? (
            <div className="alert alert-danger">
              <strong>
                {" "}
                <FormattedMessage
                  id={"Invalid"}
                  defaultMessage={"Invalid Credential :"}
                />{" "}
              </strong>{" "}
              <FormattedMessage
                id={"Invalid_Message"}
                defaultMessage={"Please Enter a valid Credential"}
              />
            </div>
          ) : null}
          <form role="form" onSubmit={this.handleLogin}>
            <div className="formContent">
              <FormGroup>
                <FormControl
                  id="email"
                  type="text"
                  placeholder="Email"
                  className="inputStyle"
                  onChange={this.handleEmail}
                  value={this.state.email}
                />
              </FormGroup>
              <FormGroup>
                <FormControl
                  id="password"
                  type="password"
                  placeholder="Password"
                  className="inputStyle"
                  onChange={this.handlePassowrd}
                  value={this.state.password}
                />
              </FormGroup>
            </div>
            <button
              type="submit"
              data-style="fill"
              data-horizontal
              className="btn progress-login progress-button btn-block loginbtn"
            >
              <FormattedMessage id={"login"} defaultMessage={"Login"} />
            </button>
          </form>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    invalidCreatential: state.auth.invalidCreatential,
    loggedInStatus: state.auth.loggedInStatus,
    user: state.auth.user
  };
}

function bindActions(dispatch) {
  return {
    loginUser: userCredentials => dispatch(loginUser(userCredentials)),
    setCoords: coords => dispatch(setGPS(coords))
  };
}
export default withRouter(
  connect(mapStateToProps, bindActions)(
    geolocated({
      positionOptions: {enableHighAccuracy: false},
      userDecisionTimeout: 5000
    })(Login)
  )
);

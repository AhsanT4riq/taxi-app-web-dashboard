import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";
import "../../../styles/common/add_customer.scss";

const validate = values => {
  const errors = {};
  if (!values.fname) {
    errors.fname = "Required";
  } else if (!values.lname) {
    errors.lname = "Required";
  } else if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  } else if (!values.phoneNo) {
    errors.phoneNo = "Phone number is Required";
  } else if (isNaN(Number(values.phoneNo))) {
    errors.phoneNo = "Phone number must be in digits";
  } else if (!values.password) {
    errors.password = "Password is Required";
  } else if (values.password !== values.confirmpassword) {
    errors.confirmpassword = "Entered passwords doesn't match";
  }
  return errors;
};


const renderField = ({
  input,
  label,
  placeholder,
  type,
  className,
  OnformBlur,
  meta: { touched, error, warning }
}) => (
  <div>
    {label !== "dob" ? (
      <label className="col-md-4 col-lg-4 col-sm-4 formlabel"> {label}</label>
    ) : (
      <span style={{ width: 0 }} />
    )}
    <div>
      <input
        className={className}
        {...input}
        type={type}
        placeholder={placeholder}
        onBlur={e => {
          input.onBlur(e);
          OnformBlur(input.name, input.value);
        }}
      />
      {touched &&
        ((error && (
          <span style={{ color: "red", textAlign: "center", display: "block" }}>
            {error}
          </span>
        )))}
    </div>
  </div>
);

class personalInfoForm extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    handleSubmit: PropTypes.func,
    OnformBlur: PropTypes.func
  };
  constructor(props) {
    super(props);
    this.state = {
      isfetched: false
    };
  }
  render() {
    return (
      <form className="form">
        <div className="col-md-12 col-lg-12">
          <div className="col-md-6 col-lg-6 col-sm-6 formdiv ">
            <Field
              className="col-md-8 col-lg-8 col-sm-8 formfield"
              name="fname"
              component={renderField}
              type="text"
              label={
                <FormattedMessage
                  id={"first_name"}
                  defaultMessage={"First Name"}
                />
              }
              placeholder="First Name"
              OnformBlur={this.props.OnformBlur}
            />
          </div>
          <div className="col-md-6 col-lg-6 col-sm-6 formdiv ">
            <Field
              className="col-md-8 col-lg-8 col-sm-8 formfield"
              name="lname"
              component={renderField}
              type="text"
              label={
                <FormattedMessage
                  id={"last_name"}
                  defaultMessage={"Last Name"}
                />
              }
              placeholder="Last Name"
              OnformBlur={this.props.OnformBlur}
            />
          </div>
          <div className="col-md-6 col-lg-6 col-sm-6 formdiv ">
            <Field
              className="col-md-8 col-lg-8 col-sm-8 formfield"
              name="email"
              component={renderField}
              type="email"
              label={
                <FormattedMessage id={"email_id"} defaultMessage={"Email Id"} />
              }
              placeholder="Email Id"
              OnformBlur={this.props.OnformBlur}
            />
          </div>
          <div className="col-md-6 col-lg-6 col-sm-6 formdiv ">
            <Field
              className="col-md-8 col-lg-8 col-sm-8 formfield"
              name="phoneNo"
              component={renderField}
              type="text"
              label={
                <FormattedMessage id={"contact"} defaultMessage={"Contact#"} />
              }
              placeholder="Phone No"
              OnformBlur={this.props.OnformBlur}
            />
          </div>
          <div className="col-md-6 col-lg-6 col-sm-6 formdiv ">
            <Field
              className="col-md-8 col-lg-8 col-sm-8 formfield"
              name="password"
              component={renderField}
              type="password"
              label={
                <FormattedMessage id={"password"} defaultMessage={"Password"} />
              }
              placeholder="Password"
              OnformBlur={this.props.OnformBlur}
            />
          </div>
          <div className="col-md-6 col-lg-6 col-sm-6 formdiv ">
            <Field
              className="col-md-8 col-lg-8 col-sm-8 formfield"
              name="confirmpassword"
              component={renderField}
              type="password"
              label={
                <FormattedMessage
                  id={"confirm_password"}
                  defaultMessage={" Confirm Password"}
                />
              }
              placeholder="Confirm Password"
              OnformBlur={this.props.OnformBlur}
            />
          </div>
          <div className="col-md-6 col-lg-6 col-sm-6 formdiv ">
            <label className="col-md-4 col-lg-4 col-sm-4 formlabel">DOB:</label>
            <span className="col-md-8 col-lg-8 col-sm-8 span1">
              <Field
                className="col-md-4 col-lg-4 col-sm-4 formcontroldd"
                name="month"
                label="dob"
                component={renderField}
                placeholder="MM"
                OnformBlur={this.props.OnformBlur}
              />
              <Field
                className="col-md-4 col-lg-4 col-sm-4 formcontrolmm"
                name="date"
                label="dob"
                component={renderField}
                placeholder="DD"
                OnformBlur={this.props.OnformBlur}
              />
              <Field
                className="col-md-4 col-lg-4 col-sm-4 formcontrolyy"
                name="year"
                label="dob"
                component={renderField}
                placeholder="YYYY"
                OnformBlur={this.props.OnformBlur}
              />
            </span>
          </div>
          <div className="col-md-6 col-lg-6 col-sm-6 formdiv ">
            <Field
              className="col-md-8 col-lg-8 col-sm-8 formfield"
              name="bloodGroup"
              component={renderField}
              type="text"
              label={
                <FormattedMessage
                  id={"blood_group"}
                  defaultMessage={"Blood Group:"}
                />
              }
              placeholder="Blood group"
              OnformBlur={this.props.OnformBlur}
            />
          </div>
        </div>
      </form>
    );
  }
}

export default reduxForm({
  form: "personalrider", // a unique identifier for this form
  validate, // <--- validation function given to redux-form
})(personalInfoForm);

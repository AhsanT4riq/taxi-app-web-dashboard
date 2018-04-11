import React, {Component} from "react";
import { Field, reduxForm } from 'redux-form'
import PropTypes from "prop-types";
import "../../../../styles/common/add_customer.scss";


const validate = values => {
  const errors = {};
  if (!values.oldpassword) {
    errors.oldpassword = "Required";
  } else if (!values.newpassword) {
    errors.newpassword = "Required";
  } else if (!values.confirmpassword) {
    errors.confirmpassword = "Required";
  } else if (values.newpassword !== values.confirmpassword) {
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

class ChangePasswordForm extends Component {
    static propTypes = {
    handleSubmit: PropTypes.func,
  };
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { handleSubmit } = this.props
    return (
      <form onSubmit={handleSubmit(this.props.onSubmitPassword)} className="form">
        <div className="col-md-12 col-lg-12 col-sm-12 formdiv ">
            <Field
              className="col-md-8 col-lg-8 col-sm-8 formfield"
              name="oldpassword"
              component={renderField}
              type="password"
              label="Old Password:"
              placeholder="Old Password"
            />
        </div>
        <div className="col-md-12 col-lg-12 col-sm-12 formdiv ">
            <Field
              className="col-md-8 col-lg-8 col-sm-8 formfield"
              name="newpassword"
              component={renderField}
              type="password"
              label="New password:"
              placeholder="New password"
            />
        </div>
        <div className="col-md-12 col-lg-12 col-sm-12 formdiv ">
            <Field
              className="col-md-8 col-lg-8 col-sm-8 formfield"
              name="confirmpassword"
              component={renderField}
              type="password"
              label="Confirm New Password:"
              placeholder="Confirm New Password"
            />
        </div>
        <div>
          <button
          type="submit"
          className="col-md-offset-4"
          style={{backgroundColor: '#1B557A',padding: 6, paddingLeft: 10, paddingRight: 10, color: '#fff', marginTop: 100}}
          >
            Change Password
          </button>
        </div>
      </form>
  )
}
}

export default reduxForm({
  form: 'changepassword', // a unique identifier for this form
  validate
})(ChangePasswordForm)


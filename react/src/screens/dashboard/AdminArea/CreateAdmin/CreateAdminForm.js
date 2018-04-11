import React, {Component} from "react";
import { Field, reduxForm } from 'redux-form'
import PropTypes from "prop-types";
import "../../../../styles/common/add_customer.scss";

const validate = values => {
  const errors = {};
  if (!values.firstname) {
    errors.firstname = "Required";
  } else if (!values.lastname) {
    errors.lastname = "Required";
  } else if (!values.emailid) {
    errors.emailid = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.emailid)) {
    errors.emailid = "Invalid email address";
  } else if (!values.phonenumber) {
    errors.phonenumber = "Phone number is Required";
  } else if (isNaN(Number(values.phonenumber))) {
    errors.phonenumber = "Phone number must be in digits";
  } else if (!values.password) {
    errors.password = "Password is Required";
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

class CreateAdminForm extends Component {
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
    <form onSubmit={handleSubmit(this.props.Onsubmitadmin)} className="form">
      <div className="col-md-12 col-lg-12 col-sm-12 formdiv ">
          <Field
            className="col-md-8 col-lg-8 col-sm-8 formfield"
            name="firstname"
            component={renderField}
            type="text"
            label="First Name:"
            placeholder="First Name"
          />
      </div>
      <div className="col-md-12 col-lg-12 col-sm-12 formdiv ">
          <Field
            className="col-md-8 col-lg-8 col-sm-8 formfield"
            name="lastname"
            component={renderField}
            type="text"
            label="Last Name:"
            placeholder="Last Name"
          />
      </div>
      <div className="col-md-12 col-lg-12 col-sm-12 formdiv ">
          <Field
            className="col-md-8 col-lg-8 col-sm-8 formfield"
            name="phonenumber"
            component={renderField}
            type="phone"
            label="Phone Number:"
            placeholder="Phone Number"
          />
      </div>
      <div className="col-md-12 col-lg-12 col-sm-12 formdiv ">
          <Field
            className="col-md-8 col-lg-8 col-sm-8 formfield"
            name="emailid"
            component={renderField}
            type="email"
            label="Email Id:"
            placeholder="Email Id"
          />
      </div>
      <div className="col-md-12 col-lg-12 col-sm-12 formdiv ">
          <Field
            className="col-md-8 col-lg-8 col-sm-8 formfield"
            name="password"
            component={renderField}
            type="password"
            label="Password:"
            placeholder="Password"
          />
      </div>
      <div>
        <button
         type="submit"
         className="col-md-offset-4"
         style={{backgroundColor: '#1B557A',padding: 6, paddingLeft: 10, paddingRight: 10, color: '#fff', marginTop: 50}}
         >
          Create Admin
        </button>
      </div>
    </form>
  )
}
}

export default reduxForm({
  form: 'createadmin', // a unique identifier for this form
  validate
})(CreateAdminForm)

 {/*<div>
        <label className="col-md-4 col-lg-4 col-sm-4" style={{marginTop: 15}}>First Name:</label>
        <div className="col-md-8 col-lg-8 col-sm-8 formdiv">
          <Field
            className="col-md-10 col-lg-10 col-sm-10  formfield"
            name="firstname"
            component="input"
            type="text"
            placeholder="First Name"
          />
        </div>
           <div>
        <label className="col-md-4 col-lg-4 col-sm-4" style={{marginTop: 15}}>Email Id:</label>
        <div className="col-md-8 col-lg-8 col-sm-8 formdiv">
          <Field
            className="col-md-10 col-lg-10 col-sm-10  formfield"
            name="emailid"
            component="input"
            type="email"
            placeholder="Email Id"
          />
        </div>
      </div>
         <div>
        <label className="col-md-4 col-lg-4 col-sm-4" style={{marginTop: 15}}>Phone Number:</label>
        <div className="col-md-8 col-lg-8 col-sm-8 formdiv">
          <Field
           className="col-md-10 col-lg-10 col-sm-10  formfield"
            name="phonenumber"
            component="input"
            type="phone"
            placeholder="Phone Number"
          />
        </div>
      </div>
      </div>*/}
      {/*<div>
        <label className="col-md-4 col-lg-4 col-sm-4" style={{marginTop: 15}}>Last Name:</label>
        <div className="col-md-8 col-lg-8 col-sm-8 formdiv">
          <Field
           className="col-md-10 col-lg-10 col-sm-10  formfield"
            name="lastname"
            component="input"
            type="text"
            placeholder="Last Name"
          />
        </div>
      </div>*/}

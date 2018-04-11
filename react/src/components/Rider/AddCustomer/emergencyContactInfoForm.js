import React, {Component} from "react";
import {Field, reduxForm} from "redux-form";
import PropTypes from "prop-types";
import {FormattedMessage} from "react-intl";
import "../../../styles/common/add_customer.scss";

const validate = values => {
  const errors = {};
  if (!values.name) {
    errors.name = "Required";
  } else if (!values.phone) {
    errors.phone = "Phone number is Required";
  } else if (isNaN(Number(values.phone))) {
    errors.phone = "Phone number must be in digits";
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
  meta: {touched, error, warning}
}) => (
  <div>
    {label !== "dob" ? (
      <label className="col-md-4 col-lg-4 col-sm-4 formlabel"> {label}</label>
    ) : (
      <span style={{width: 0}} />
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
        (error && (
          <span style={{color: "red", textAlign: "center", display: "block"}}>
            {error}
          </span>
        ))}
    </div>
  </div>
);

class emergencyContactInfoForm extends Component {
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
          <div className="formdiv ">
            <Field
              className="col-md-8 col-lg-8 col-sm-8 formfield"
              name="name"
              component={renderField}
              type="text"
              label={<FormattedMessage id={"name"} defaultMessage={"Name:"} />}
              placeholder="Name"
              OnformBlur={this.props.OnformBlur}
            />
          </div>
          <div className="formdiv ">
            <Field
              className="col-md-8 col-lg-8 col-sm-8 formfield"
              name="phone"
              component={renderField}
              type="text"
              label={
                <FormattedMessage
                  id={"phone_no"}
                  defaultMessage={"Phone No:"}
                />
              }
              placeholder="Phone No"
              OnformBlur={this.props.OnformBlur}
            />
          </div>
        </div>
      </form>
    );
  }
}

export default reduxForm({
  form: "emergencycontactrider", // a unique identifier for this form
  validate // <--- validation function given to redux-form
})(emergencyContactInfoForm);

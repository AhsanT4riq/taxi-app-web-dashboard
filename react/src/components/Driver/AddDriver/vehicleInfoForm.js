import React, { Component } from "react";
import PropTypes from "prop-types";
import { Field, reduxForm } from "redux-form";
import { FormattedMessage } from "react-intl";
import "../../../styles/common/add_driver.scss";

const validate = values => {
  const errors = {};
  if (!values.RC_ownerName) {
    errors.RC_ownerName = "Required";
  } else if (!values.regNo) {
    errors.regNo = "Required";
  } else if (!values.type) {
    errors.type = "Required";
  } else if (!values.company) {
    errors.company = "Required";
  } else if (!values.carModel) {
    errors.carModel = "Required";
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
    {label !== "VN" ? (
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
          OnformBlur(input.name, input.value, label);
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
class vehicleInfoForm extends Component {

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
              name="RC_ownerName"
              component={renderField}
              type="text"
              label="RC Owner Name:"
              placeholder="RC Owner Name"
              OnformBlur={this.props.OnformBlur}
            />
          </div>
          <div className="col-md-6 col-lg-6 col-sm-6 formdiv ">
            <Field
              className="col-md-8 col-lg-8 col-sm-8 formfield"
              name="regNo"
              component={renderField}
              type="text"
              label="Rgd. RTO:"
              placeholder="Registered RTO"
              OnformBlur={this.props.OnformBlur}
            />
          </div>
          <div className="col-md-6 col-lg-6 col-sm-6 formdiv ">
            <Field
              className="col-md-8 col-lg-8 col-sm-8 formfield"
              name="type"
              component={renderField}
              type="text"
              label="Class Of Vehicle:"
              placeholder="class of vehicle"
              OnformBlur={this.props.OnformBlur}
            />
          </div>
          <div className="col-md-6 col-lg-6 col-sm-6 formdiv ">
            <Field
              className="col-md-8 col-lg-8 col-sm-8 formfield"
              name="company"
              component={renderField}
              type="text"
              label="Manufacturer:"
              placeholder="Manufacturer"
              OnformBlur={this.props.OnformBlur}
            />
          </div>
          <div className="col-md-6 col-lg-6 col-sm-6 formdiv ">
            <label className="col-md-4 col-lg-4 col-sm-4 formlabel">
              Vehicle Number:
            </label>
            <span className="col-md-8 col-lg-8 col-sm-8 span1">
              <Field
                className="col-md-3 col-lg-3 col-sm-3 formcontrolst"
                name="state"
                label="VN"
                component={renderField}
                placeholder="KA"
                OnformBlur={this.props.OnformBlur}
              />
              <Field
                className="col-md-3 col-lg-3 col-sm-3 formcontrolsno"
                name="sno"
                label="VN"
                component={renderField}
                placeholder="55"
                OnformBlur={this.props.OnformBlur}
              />
              <Field
                className="col-md-3 col-lg-3 col-sm-3 formcontrolsc"
                name="div"
                label="VN"
                component={renderField}
                placeholder="AS"
                OnformBlur={this.props.OnformBlur}
              />
              <Field
                className="col-md-3 col-lg-3 col-sm-3 formcontrolvno"
                name="vehicleno"
                label="VN"
                component={renderField}
                placeholder="1245"
                OnformBlur={this.props.OnformBlur}
              />
            </span>
          </div>
          <div className="col-md-6 col-lg-6 col-sm-6 formdiv ">
            <Field
              className="col-md-8 col-lg-8 col-sm-8 formfield"
              name="carModel"
              component={renderField}
              type="text"
              label="Vehicle Model:"
              placeholder="Vehicle Model"
              OnformBlur={this.props.OnformBlur}
            />
          </div>
        </div>
      </form>
    );
  }
}

export default reduxForm({
  form: "vehicledriver", // a unique identifier for this form
  validate, // <--- validation function given to redux-form
})(vehicleInfoForm);

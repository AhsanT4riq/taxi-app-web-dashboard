import React, { Component } from "react";
import PropTypes from "prop-types";
import { Field, reduxForm } from "redux-form";
import { FormattedMessage } from "react-intl";
import "../../../styles/common/add_driver.scss";

const validate = values => {
  const errors = {};
  if (!values.licenceNo) {
    errors.licenceNo = "Required";
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
    {label === "Id" || label === "Ed" ? (
      <span style={{ width: 0 }} />
    ) : (
      <label className="col-md-4 col-lg-4 col-sm-4 formlabel"> {label}</label>
    )}
    <div>
      <input
        className={className}
        {...input}
        type={type}
        placeholder={placeholder}
        onBlur={(e) => {
          input.onBlur(e);
          OnformBlur(input.name, input.value, label);
        }}
      />
      {touched &&
        ((error && (
          <span
            style={{
              color: "red",
              textAlign: "center",
              display: "block"
            }}
          >
            {error}
          </span>
        )))}
    </div>
  </div>
);

class licenceInfoForm extends Component {
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
              name="licenceNo"
              component={renderField}
              type="text"
              label={
                <FormattedMessage id={"license"} defaultMessage={"License#:"} />
              }
              placeholder="Licence No"
              OnformBlur={this.props.OnformBlur}
            />
          </div>
          <div className="formdiv ">
            <label className="col-md-4 col-lg-4 col-sm-4 formlabel">
              <FormattedMessage
                id={"issue_date"}
                defaultMessage={"Issue Date:"}
              />
            </label>
            <span className="col-md-8 col-lg-8 col-sm-8 span1">
              <Field
                className="col-md-4 col-lg-4 col-sm-4 formcontroldd"
                name="month"
                label="Id"
                component={renderField}
                placeholder="MM"
                OnformBlur={this.props.OnformBlur}
              />
              <Field
                className="col-md-4 col-lg-4 col-sm-4 formcontrolmm"
                name="date"
                label="Id"
                component={renderField}
                placeholder="DD"
                OnformBlur={this.props.OnformBlur}
              />
              <Field
                className="col-md-4 col-lg-4 col-sm-4 formcontrolyy"
                name="year"
                label="Id"
                component={renderField}
                placeholder="YYYY"
                OnformBlur={this.props.OnformBlur}
              />
            </span>
          </div>
          <div className="formdiv ">
            <label className="col-md-4 col-lg-4 col-sm-4 formlabel">
              <FormattedMessage id={"exp_date"} defaultMessage={"Exp Date:"} />
            </label>
            <span className="col-md-8 col-lg-8 col-sm-8 span1">
              <Field
                className="col-md-4 col-lg-4 col-sm-4 formcontroldd"
                name="emonth"
                label="Ed"
                component={renderField}
                placeholder="MM"
                OnformBlur={this.props.OnformBlur}
              />
              <Field
                className="col-md-4 col-lg-4 col-sm-4 formcontrolmm"
                name="edate"
                label="Ed"
                component={renderField}
                placeholder="DD"
                OnformBlur={this.props.OnformBlur}
              />
              <Field
                className="col-md-4 col-lg-4 col-sm-4 formcontrolyy"
                name="eyear"
                label="Ed"
                component={renderField}
                placeholder="YYYY"
                OnformBlur={this.props.OnformBlur}
              />
            </span>
          </div>
        </div>
      </form>
    );
  }
}

export default reduxForm({
  form: "licencedriver", // a unique identifier for this form
  validate, // <--- validation function given to redux-form
})(licenceInfoForm);

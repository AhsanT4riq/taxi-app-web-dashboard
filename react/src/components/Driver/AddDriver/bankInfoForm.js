import React, {Component} from "react";
import PropTypes from "prop-types";
import {Field, reduxForm} from "redux-form";
import {FormattedMessage} from "react-intl";
import "../../../styles/common/add_driver.scss";

const validate = values => {
  const errors = {};
  if (!values.accountNo) {
    errors.accountNo = "Required";
  } else if (!values.holderName) {
    errors.holderName = "Required";
  } else if (!values.IFSC) {
    errors.IFSC = "Required";
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
    <label className="col-md-4 col-lg-4 col-sm-4 formlabel"> {label}</label>
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
          <span style={{color: "red", textAlign: "center", display: "block"}}>
            {error}
          </span>
        )))}
    </div>
  </div>
);

class bankInfoForm extends Component {
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
              name="accountNo"
              component={renderField}
              type="text"
              label={
                <FormattedMessage
                  id={"account_no"}
                  defaultMessage={"Account No:"}
                />
              }
              placeholder="Account No"
              OnformBlur={this.props.OnformBlur}
            />
          </div>
          <div className="formdiv ">
            <Field
              className="col-md-8 col-lg-8 col-sm-8 formfield"
              name="holderName"
              component={renderField}
              type="text"
              label={
                <FormattedMessage
                  id={"holder_name"}
                  defaultMessage={"Holder Name:"}
                />
              }
              placeholder="Holder Name"
              OnformBlur={this.props.OnformBlur}
            />
          </div>
          <div className="formdiv ">
            <Field
              className="col-md-8 col-lg-8 col-sm-8 formfield"
              name="IFSC"
              component={renderField}
              type="text"
              label={<FormattedMessage id={"ifsc"} defaultMessage={"IFSC:"} />}
              placeholder="IFSC Code"
              OnformBlur={this.props.OnformBlur}
            />
          </div>
        </div>
      </form>
    );
  }
}

export default reduxForm({
  form: "bankdriver", // a unique identifier for this form
  validate // <--- validation function given to redux-form
})(bankInfoForm);

import React, {Component} from "react";
import {Form, FormGroup, ControlLabel, FormControl} from "react-bootstrap";
import PropTypes from "prop-types";
import _ from "lodash";
import {FormattedMessage} from "react-intl";
import "../../styles/common/mobileapp_configuration.scss";

class tripPriceCalculation extends Component {
  static propTypes = {
    tripObj: PropTypes.object,
    onUpdateTrip: PropTypes.func
  };
  handleChange(value, label, updateReq) {
    if (label !== "currencySymbol") {
      this.props.tripObj.tripPrice[label] = parseFloat(value);
    } else {
      this.props.tripObj.tripPrice[label] = value;
    }
    this.props.onUpdateTrip(
      this.props.tripObj.tripPrice,
      "tripPrice",
      updateReq
    );
  }
  render() {
    const tripPrice = this.props.tripObj.tripPrice;
    return (
      <div className="col-lg-7 col-md-7 col-sm-12 col-xs-12">
        <div className="panel panel-primary Panelprice">
          <div className="panel-heading">
            <span>
              {" "}
              <FormattedMessage
                id={"trip_price"}
                defaultMessage={"Trip Price Calculation"}
              />
            </span>
          </div>
          <div className="panel-body panelBody">
            <Form inline className="col-md-12 col-lg-12 col-sm-12 form">
              <FormGroup
                controlId="formInlineName"
                className="col-md-12 col-lg-12 col-sm-12 formgroup"
              >
                <ControlLabel className="col-md-4 col-lg-4 col-sm-4 ">
                  <FormattedMessage
                    id={"currency_symbol"}
                    defaultMessage={"Currency Symbol"}
                  />
                </ControlLabel>

                <FormControl
                  className="col-md-8 col-lg-8 col-sm-8 formcontrol"
                  type="text"
                  placeholder={_.get(tripPrice, "currencySymbol", "$")}
                  onBlur={event =>
                    this.handleChange(
                      event.target.value,
                      "currencySymbol",
                      true
                    )
                  }
                />
              </FormGroup>
              <FormGroup
                controlId="formInlineEmail"
                className="col-md-12 col-lg-12 col-sm-12 formgroup"
              >
                <ControlLabel className="col-md-4 col-lg-4 col-sm-4">
                  {" "}
                  <FormattedMessage
                    id={"base_fare"}
                    defaultMessage={"Base Fare:"}
                  />
                </ControlLabel>
                <FormControl
                  type="email"
                  className="col-md-8 col-lg-8 col-sm-8 formcontrol"
                  placeholder={_.get(tripPrice, "baseFare", "")}
                  onBlur={event =>
                    this.handleChange(event.target.value, "baseFare", true)
                  }
                />
              </FormGroup>

              <FormGroup
                controlId="formInlineName"
                className="col-md-12 col-lg-12 col-sm-12 formgroup"
              >
                <ControlLabel className="col-md-4 col-lg-4 col-sm-4">
                  <FormattedMessage
                    id={"fare_km"}
                    defaultMessage={"Fare Per Km:"}
                  />
                </ControlLabel>

                <FormControl
                  type="text"
                  className="col-md-8 col-lg-8 col-sm-8 formcontrol"
                  placeholder={_.get(tripPrice, "farePerKm", "")}
                  onBlur={event =>
                    this.handleChange(event.target.value, "farePerKm", true)
                  }
                />
              </FormGroup>

              <FormGroup
                controlId="formInlineEmail"
                className="col-md-12 col-lg-12 col-sm-12 formgroup"
              >
                <ControlLabel className="col-md-4 col-lg-4 col-sm-4">
                  <FormattedMessage
                    id={"fare_min"}
                    defaultMessage={"Fare Per Min:"}
                  />
                </ControlLabel>

                <FormControl
                  className="col-md-8 col-lg-8 col-sm-8 formcontrol"
                  placeholder={_.get(tripPrice, "farePerMin", "")}
                  onBlur={event =>
                    this.handleChange(event.target.value, "farePerMin", true)
                  }
                />
              </FormGroup>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

export default tripPriceCalculation;

import React, { Component } from "react";
import ToggleButton from "react-toggle-button";
import PropTypes from "prop-types";
import {
  ListGroup,
  ListGroupItem,
  Form,
  FormGroup,
  FormControl,
  ControlLabel
} from "react-bootstrap";
import _ from "lodash";
import "../../styles/common/mobileapp_configuration.scss";

class payment extends Component {
  static propTypes = {
    payObj: PropTypes.object,
    onUpdatePay: PropTypes.func,
    stripe: PropTypes.bool,
    cash: PropTypes.bool
  };
  constructor(props) {
    super(props);
    this.state = {
      paypalbtn: false,
      stripePanel: true,
      stripe: _.get(this.props, "payObj.stripe", ""),
      cash: _.get(this.props, "payObj.cash", "")
    };
  }
  handleChange(value, label, updateReq) {
    if (label === "stripe") {
      this.setState({
        stripePanel: !this.state.stripePanel,
        stripe: !this.state.stripe
      });
    } else if (label === "cash") {
      this.setState({ cash: !this.state.cash });
    }

    this.props.onUpdatePay(value, label, updateReq);
  }
  updateStripe(value, label, updateReq) {
    this.props.payObj.stripeConfig[label] = value;
    this.props.onUpdatePay(
      this.props.payObj.stripeConfig,
      "stripeConfig",
      updateReq
    );
  }
  render() {
    const stripeConfig = _.get(this.props, "payObj.stripeConfig", "");
    return (
      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
        <div
          className="col-lg-7 col-md-7 col-sm-12 col-xs-12"
          style={{ paddingLeft: 0 }}
        >
          <div className="panel panel-primary panelmobileApp">
            <div className="panel-heading">
              <span>Payment</span>
            </div>
            <div className="panel-body panelBody">
              <ListGroup className="pannelListGroup">
                <ListGroupItem className="pannelList">
                  <span>Stripe</span>
                  <span className="pannelListButtons">
                    <ToggleButton
                      inactiveLabel={""}
                      activeLabel={""}
                      colors={{
                        active: {
                          base: "rgb(51, 171, 240)",
                          hover: "rgb(51, 171, 240)"
                        },
                        inactive: {
                          base: "rgb(187,187,187)",
                          hover: "rgb(187,187,187)"
                        }
                      }}
                      trackStyle={{ width: 32, height: 18 }}
                      thumbStyle={{
                        width: 25,
                        height: 25,
                        alignSelf: "center",
                        marginBottom: 2
                      }}
                      thumbAnimateRange={[-15, 22]}
                      value={this.state.stripe}
                      onToggle={value => {
                        this.handleChange(!value, "stripe", true);
                      }}
                    />
                  </span>
                </ListGroupItem>
                <ListGroupItem className="pannelList">
                  <span>Cash</span>
                  <span className="pannelListButtons">
                    <ToggleButton
                      inactiveLabel={""}
                      activeLabel={""}
                      colors={{
                        active: {
                          base: "rgb(51, 171, 240)",
                          hover: "rgb(51, 171, 240)"
                        },
                        inactive: {
                          base: "rgb(187,187,187)",
                          hover: "rgb(187,187,187)"
                        }
                      }}
                      trackStyle={{ width: 32, height: 18 }}
                      thumbStyle={{
                        width: 25,
                        height: 25,
                        alignSelf: "center",
                        marginBottom: 2
                      }}
                      thumbAnimateRange={[-15, 22]}
                      value={this.state.cash}
                      onToggle={value => {
                        this.handleChange(!value, "cash", true);
                      }}
                    />
                  </span>
                </ListGroupItem>
              </ListGroup>
            </div>
          </div>
        </div>
        {this.props.payObj.stripe ? (
          <div
            className="col-lg-5 col-md-5 col-sm-12 col-xs-12"
            style={{ paddingRight: 0 }}
          >
            <div className="panel panel-primary panelmobileApp">
              <div className="panel-heading">
                <span>Stripe Payment</span>
              </div>
              <div className="panel-body panelBody">
                <Form inline className="col-md-12 col-lg-12 col-sm-12 form">
                  <FormGroup
                    controlId="formInlineName"
                    className="col-md-10 col-lg-10 col-sm-10 formgroup"
                  >
                    <ControlLabel className="col-md-4 col-lg-4 col-sm-4 ">
                      {" "}
                      Key#:
                    </ControlLabel>

                    <FormControl
                      className="col-md-8 col-lg-8 col-sm-8 formcontrol"
                      placeholder={stripeConfig.stripekey}
                      type="text"
                      onBlur={event =>
                        this.updateStripe(event.target.value, "stripekey", true)
                      }
                    />
                  </FormGroup>
                </Form>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}
export default payment;

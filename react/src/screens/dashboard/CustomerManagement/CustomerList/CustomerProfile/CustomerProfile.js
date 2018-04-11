import React, {Component} from "react";
import {connect} from "react-redux";
import {Table, ButtonToolbar, Button, Tabs, Tab} from "react-bootstrap";
import _ from "lodash";
import PropTypes from "prop-types";
import TripAction from "../../../../../redux/tripDetails/action";
import Rating from "../../../../../components/UserRatingComponent";
import "../../../../../styles/common/CustomerProfile.scss";

const profileImage = require("../../../../../resources/images/dashboardIcons/taxi_logo.png");

class CustomerProfile extends Component {
  static propTypes = {
    fetchSpecificUserTrips: PropTypes.func,
    userprofiledetails: PropTypes.any,
    tripList: PropTypes.arrayOf(Object),
    loading: PropTypes.bool
  };
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    };
    this.setLoading = this.setLoading.bind(this);
  }
  componentWillMount() {
    if (this.props.userprofiledetails.id) {
      this.props.fetchSpecificUserTrips(this.props.userprofiledetails.id);
    }
  }
  componentWillReceiveProps(nextProps) {
    this.setLoading(nextProps.loading);
  }

  setLoading(loading) {
    this.setState({isLoading: loading});
  }
  render() {
    return (
      <div>
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 profilediv">
          <img
            alt="profile"
            src={_.get(this.props, "userprofiledetails.profileUrl", "")}
            className="image"
          />
          <div className="profdetails">
            <div>
              <span className="profname">
                {_.get(this.props.userprofiledetails, "fname", "")}{" "}
                {_.get(this.props.userprofiledetails, "lname", "")}
              </span>
              <span className="profrating">
                <Rating
                  noofstars={5}
                  ratedStar={this.props.userprofiledetails.userRating}
                />
              </span>
            </div>
            <div className="namephone">
              <span className="phone">
                <span
                  style={{color: "#bbb"}}
                  className="glyphicon glyphicon-phone"
                />
                <span style={{fontSize: 12, marginLeft: 5, color: "#bbb"}}>
                  {this.props.userprofiledetails.phoneNo}
                </span>
              </span>
              <span className="email">
                <span
                  style={{marginLeft: 5, fontSize: 12, color: "#bbb"}}
                  className="glyphicon glyphicon-envelope"
                />
                <span style={{fontSize: 12, marginLeft: 5, color: "#bbb"}}>
                  {this.props.userprofiledetails.email}
                </span>
              </span>
            </div>
          </div>
          <div style={{float: "right", display: "none"}}>
            <Button className="deactivebutton">De-Activate</Button>
          </div>
        </div>
        <Tabs
          defaultActiveKey={1}
          animation={false}
          id="noanim-tab-example"
          className="col-lg-12 col-md-12 col-sm-12 col-xs-12"
        >
          <Tab eventKey={1} title="Recent Reviews">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 tabdiv">
              {this.state.isLoading ? (
                <div className="loading-wrap" style={{minHeight: 500}}>
                  <div className="loading">
                    <div id="spinner">
                      <svg
                        className="spinner"
                        width="65px"
                        height="65px"
                        viewBox="0 0 66 66"
                      >
                        <circle
                          className="path"
                          fill="none"
                          strokeWidth="4"
                          strokeLinecap="round"
                          cx="33"
                          cy="33"
                          r="30"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="panel panel-primary">
                  <div className="panel-body panelTableBody">
                    <Table responsive className="panelTable">
                      <thead>
                        <tr className="panelTableHead">
                          <th className="col-md-1">Trip Code</th>
                          <th className="col-md-2">Driver Name</th>
                          <th className="col-md-1.5">Time</th>
                          <th className="col-md-3">Payment Mode</th>
                          <th className="col-md-2">Amount</th>
                          <th className="col-md-2.5">Rating</th>
                        </tr>
                      </thead>
                      <tbody className="panelTableTBody">
                        {this.props.tripList.map(item => (
                          <tr>
                            <td>{item._id}</td>
                            <td>{item.driverName}</td>
                            <td>
                              {item.bookingTime.substring(0, 10)}{" "}
                              {item.bookingTime.substring(11, 16)}{" "}
                              {parseInt(item.bookingTime.substring(11, 14)) <
                              11 ? (
                                  <span>AM </span>
                                ) : (
                                  <span>PM</span>
                                )}
                            </td>
                            <td>{item.paymentMode}</td>
                            <td>{"$"}{" "}{item.tripAmt}</td>
                            <td>
                              <Rating
                                noofstars={5}
                                ratedStar={item.riderRatingByDriver}
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                </div>
              )}
            </div>
          </Tab>
        </Tabs>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    userprofiledetails: state.userprofiledetails,
    tripList: state.tripDetails.tripData,
    loading: state.tripDetails.tripLoading
  };
}
function bindActions(dispatch) {
  return {
    fetchSpecificUserTrips: id =>
      dispatch(TripAction.fetchSpecificUserTrips(id))
  };
}
export default connect(mapStateToProps, bindActions)(CustomerProfile);

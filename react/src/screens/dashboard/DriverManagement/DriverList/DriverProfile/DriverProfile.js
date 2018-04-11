import React, {Component} from "react";
import {connect} from "react-redux";
import _ from "lodash";
import PropTypes from "prop-types";
import Lightbox from 'react-image-lightbox';
import {Table, Button, Tabs, Tab} from "react-bootstrap";
import TripAction from "../../../../../redux/tripDetails/action";
import Rating from "../../../../../components/UserRatingComponent";
import "../../../../../styles/common/DriverProfile.scss";

class DriverProfile extends Component {
  static propTypes = {
    fetchSpecificUserTrips: PropTypes.func,
    userprofiledetails: PropTypes.any,
    tripList: PropTypes.object,
    loading: PropTypes.bool
  };
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isOpen: false,
      imageUrl: ''
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

   openLIghtBox(url) {
    this.setState({ isOpen: true, imageUrl: url })
  }
  render() {
    const user = this.props.userprofiledetails;
    console.log('user', user);
    return (
      <div>
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 profilediv">
          <img
            alt="profile"
            src={this.props.userprofiledetails.profileUrl}
            className="image"
          />
          <div className="profdetails">
            <div>
              <span className="profname}">
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
                {" "}
                <span
                  style={{color: "#bbb"}}
                  className="glyphicon glyphicon-phone"
                />
                <span style={{fontSize: 12, marginLeft: 5, color: "#bbb"}}>
                  {this.props.userprofiledetails.phoneNo}
                </span>
              </span>
              <span className="email">
                {" "}
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
          style={{float: "left"}}
        >
          <Tab eventKey={1} title="Details">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 tabdiv">
              <div className="panel panel-primary">
                <div className="panel-body panelTableBody" style={{padding: 10}}>
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                     <div className="panel panel-primary">
                        <div className="panel-heading">
                          <span>Personal Details</span>
                        </div>
                        <div className="panel-body panelBody driverDetailsPanel">
                            <div  className="contentdiv">
                            <span className="title">Licence No:</span>
                            <span className="tittleValue">{_.get(user.licenceDetails , "licenceNo") ? user.licenceDetails.licenceNo : "sdjhbcvfvbhfjhvf" }</span>
                            </div>
                            <div className="contentdiv">
                            <span className="title">Licence Issue Date:</span>
                            <span>{_.get(user.licenceDetails, "issueDate") ? user.licenceDetails.issueDate : "11/11/1234"}</span>
                            </div>
                            <div className="contentdiv">
                            <span className="title">Licence Expiry Date:</span>
                            <span>{_.get(user.licenceDetails, "expDate") ? user.licenceDetails.expDate : "11/11/234" }</span>
                            </div>
                            <div className="contentdiv">
                            <span className="title">Licence Url:</span>
                            <a>{_.get(user, "licenceUrl") ? user.licenceUrl : "httplicenceurl: 12345" }</a>
                            </div>
                        </div>
                      </div>
                     <div className="panel panel-primary">
                        <div className="panel-heading">
                          <span>Licence Details</span>
                        </div>
                        <div className="panel-body panelBody driverDetailsPanel">
                            <div  className="contentdiv">
                            <span className="title">Licence No:</span>
                            <span className="tittleValue">{_.get(user.licenceDetails , "licenceNo") ? user.licenceDetails.licenceNo : "sdjhbcvfvbhfjhvf" }</span>
                            </div>
                            <div className="contentdiv">
                            <span className="title">Licence Issue Date:</span>
                            <span>{_.get(user.licenceDetails, "issueDate") ? user.licenceDetails.issueDate : "11/11/1234"}</span>
                            </div>
                            <div className="contentdiv">
                            <span className="title">Licence Expiry Date:</span>
                            <span>{_.get(user.licenceDetails, "expDate") ? user.licenceDetails.expDate : "11/11/234" }</span>
                            </div>
                            <div className="contentdiv">
                            <span className="title">Licence Url:</span>
                            <a>{_.get(user, "licenceUrl") ? user.licenceUrl : "httplicenceurl: 12345" }</a>
                            </div>
                        </div>
                      </div>
                      <div className="panel panel-primary">
                        <div className="panel-heading">
                          <span>Bank Details</span>
                        </div>
                        <div className="panel-body panelBody driverDetailsPanel">
                            <div className="contentdiv">
                            <span className="title">Account Number:</span>
                            <span className="tittleValue">{_.get(user.bankDetails, "accountNo") ? user.bankDetails.accountNo : "30303030303030" }</span>
                            </div>
                            <div className="contentdiv">
                            <span className="title">Account Holder Name:</span>
                            <span className="tittleValue">{_.get(user.bankDetails, "holderName") ? user.bankDetails.holderName : "Taxi App Holder"}</span>
                            </div>
                            <div className="contentdiv">
                            <span className="title">IFSC Code:</span>
                            <span className="tittleValue">{_.get(user.bankDetails, "IFSC") ? user.bankDetails.IFSC : "SBIN0006767" }</span>
                            </div>
                        </div>
                      </div>
                      <div className="panel panel-primary">
                        <div className="panel-heading">
                          <span>Car Details</span>
                        </div>
                        <div className="panel-body panelBody driverDetailsPanel">
                          <div className="col-md-12 col-sm-12 col-lg-12">
                            <div className="contentdiv col-md-6 col-sm-6 col-lg-6">
                            <span className="title col-md-4 col-sm-4 col-lg-4">Car Type:</span>
                            <span className="tittleValue col-md-8 col-sm-8 col-lg-8">{_.get(user.carDetails, "type") ? user.carDetails.type : "Taxi Go" }</span>
                            </div>
                            <div className="contentdiv col-md-6 col-sm-6 col-lg-6">
                            <span className="title col-md-4 col-sm-4 col-lg-4">Car Model:</span>
                            <span className="tittleValue col-md-8 col-sm-8 col-lg-8">{_.get(user.carDetails, "carModel") ? user.carDetails.carModel : "Z111"}</span>
                            </div>
                            <div className="contentdiv col-md-6 col-sm-6 col-lg-6">
                            <span className="title col-md-4 col-sm-4 col-lg-4">Company:</span>
                            <span className="tittleValue col-md-8 col-sm-8 col-lg-8">{_.get(user.carDetails, "company") ? user.carDetails.company : "Jaguar" }</span>
                            </div>
                            <div className="contentdiv col-md-6 col-sm-6 col-lg-6">
                            <span className="title col-md-4 col-sm-4 col-lg-4">Vehicle No:</span>
                            <span className="tittleValue col-md-8 col-sm-8 col-lg-8">{_.get(user.carDetails, "vehicleNo") ? user.carDetails.vehicleNo : "KA 55 QW 4545" }</span>
                            </div>
                            <div className="contentdiv col-md-6 col-sm-6 col-lg-6">
                            <span className="title col-md-4 col-sm-4 col-lg-4">RC Owner Name:</span>
                            <span className="tittleValue col-md-8 col-sm-8 col-lg-8">{_.get(user.carDetails, "RC_ownerName") ? user.carDetails.RC_ownerName: "Taxi Owner" }</span>
                            </div>
                            <div className="contentdiv col-md-6 col-sm-6 col-lg-6">
                            <span className="title col-md-4 col-sm-4 col-lg-4">Registration Date:</span>
                            <span className="tittleValue col-md-8 col-sm-8 col-lg-8">{_.get(user.carDetails, "regDate") ? user.carDetails.regDate: "11/11/1234" }</span>
                            </div>
                            <div className="contentdiv col-md-6 col-sm-6 col-lg-6">
                            <span className="title col-md-4 col-sm-4 col-lg-4">Registration Number:</span>
                            <span className="tittleValue col-md-8 col-sm-8 col-lg-8">{_.get(user.carDetails, "regNo") ? user.carDetails.regNo: "POE234ERTY" }</span>
                            </div>
                          </div>
                          <div className="col-md-12 col-sm-12 col-lg-12">
                            <div className="imgdiv col-md-6 col-sm-6 col-lg-6">
                              <span className="title col-md-4 col-sm-4 col-lg-4">insurance file:</span>
                              <img
                                className="col-md-8 col-sm-8 col-lg-8"
                                src={user.insuranceUrl}
                                alt="insurance url"
                                onClick={() => this.openLIghtBox(user.insuranceUrl)}
                              />
                            </div>
                            <div className="imgdiv col-md-6 col-sm-6 col-lg-6">
                              <span className="title col-md-4 col-sm-4 col-lg-4">Vehicle paper  file:</span>
                              <img className="col-md-8 col-sm-8 col-lg-8" src={user.vechilePaperUrl} alt="insurance url" onClick={() => this.openLIghtBox(user.vechilePaperUrl)} />
                            </div>
                            <div className="imgdiv col-md-6 col-sm-6 col-lg-6">
                              <span className="title col-md-4 col-sm-4 col-lg-4">RC Book file:</span>
                              <img className="col-md-8 col-sm-8 col-lg-8" src={user.rcBookUrl} alt="insurance url" onClick={() => this.openLIghtBox(user.rcBookUrl)}/>
                            </div>
                            <div className="imgdiv col-md-6 col-sm-6 col-lg-6">
                              <span className="title col-md-4 col-sm-4 col-lg-4">Licence file:</span>
                              <img className="col-md-8 col-sm-8 col-lg-8" src={user.licenceUrl} alt="insurance url" onClick={() => this.openLIghtBox(user.licenceUrl)}/>
                            </div>
                          </div>
                        </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Tab>
          <Tab eventKey={2} title="Recent Reviews">
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
                          <th className="col-md-2">User Name</th>
                          <th className="col-md-1.5">Time</th>
                          <th className="col-md-5">Review</th>
                          <th className="col-md-2.5">Rating</th>
                        </tr>
                      </thead>
                      <tbody className="panelTableTBody">
                        {this.props.tripList.map(item => (
                          <tr>
                            <td>{item._id}</td>
                            <td>{item.riderName}</td>
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
                            <td>{item.driverReviewByRider} </td>
                            <td>
                              <Rating
                                noofstars={5}
                                ratedStar={item.driverRatingByRider}
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
          {/*<Tab eventKey={3} title=" transactions">
             <span>hiii</span>
            </Tab>*/}
        </Tabs>
          {this.state.isOpen && (
          <Lightbox
            mainSrc={this.state.imageUrl}
            onCloseRequest={() => this.setState({ isOpen: false })}
          />
        )}
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
export default connect(mapStateToProps, bindActions)(DriverProfile);

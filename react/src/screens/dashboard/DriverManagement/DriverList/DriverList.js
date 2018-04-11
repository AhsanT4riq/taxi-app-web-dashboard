import React, {Component} from "react";
import {connect} from "react-redux";
import {
  Pagination,
  Button,
  FormControl,
  DropdownButton,
  MenuItem,
  InputGroup
} from "react-bootstrap";
import {FormattedMessage} from "react-intl";
import _ from "lodash";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import UserAction from "../../../../redux/users/action";
import UserProfileAction from "../../../../redux/userProfile/action";
import Rating from "../../../../components/UserRatingComponent";
import "../../../../styles/common//DriverList.scss";

class DriversList extends Component {
  static propTypes = {
    userList: PropTypes.any,
    fetchUsers: PropTypes.func,
    loading: PropTypes.bool,
    meta: PropTypes.object,
    userprofiledetails: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      activePage: 1
    };
    this.setLoading = this.setLoading.bind(this);
    this.handlePagination = this.handlePagination.bind(this);
  }
  componentWillMount() {
    this.props.fetchUsers(this.state.activePage, "driver"); //eslint-disable-line
  }
  componentWillReceiveProps(nextProps) {
    this.setLoading(nextProps.loading);
  }

  setLoading(loading) {
    this.setState({isLoading: loading});
  }
  updateProfile(user) {
    this.props.userprofiledetails(user);
  }
  handlePagination(eventkey) {
    this.setState({activePage: eventkey});
    this.props.fetchUsers(eventkey, "driver"); //eslint-disable-line
  }
  render() {
    return (
      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
        <div className="panel panel-primary">
          <div className="panel-heading panelheading">
            <span>
              {" "}
              <FormattedMessage
                id={"drivers_list"}
                defaultMessage={"Drivers List"}
              />
            </span>
            <div
              className="col-sm-4 col-xs-4"
              style={{
                float: "right",
                marginTop: -7,
                marginRight: -10,
                display: "none"
              }}
            >
              <InputGroup className="col-sm-8 col-xs-8 inputgroup">
                <InputGroup.Addon className="inputaddon">
                  >
                  <span
                    className="glyphicon glyphicon-search"
                    style={{color: "#bbb"}}
                  />
                </InputGroup.Addon>
                <FormControl
                  type="text"
                  className="forminput"
                  placeholder="ie Suraj,Tata Tiago,KA-25-MX-007 etc"
                />
              </InputGroup>
              <DropdownButton
                bsStyle="primary"
                className="col-sm-12 col-xs-12"
                title="Relevant"
                id="bg-nested-dropdown"
                style={{marginLeft: 10}}
              >
                <MenuItem eventKey="1">Dropdown link</MenuItem>
                <MenuItem eventKey="2">Dropdown link</MenuItem>
              </DropdownButton>
            </div>
          </div>
          <div className="panel-body panelTableBody">
            <table className="col-xs-12 panelTable">
              <thead>
                <tr className="panelTableHead">
                  <th className="col-md-2">
                    {" "}
                    <FormattedMessage id={"name"} defaultMessage={"Name"} />
                  </th>
                  <th className="col-md-2">
                    {" "}
                    <FormattedMessage
                      id={"vehicle_model"}
                      defaultMessage={"Vehicle Model"}
                    />
                  </th>
                  <th className="col-md-2">
                    {" "}
                    <FormattedMessage
                      id={"reg_no"}
                      defaultMessage={"Reg. No"}
                    />
                  </th>
                  <th className="col-md-1.5">
                    {" "}
                    <FormattedMessage
                      id={"contact_no"}
                      defaultMessage={"Contact No."}
                    />
                  </th>
                  <th className="col-md-1.5">
                    {" "}
                    <FormattedMessage
                      id={"email_id"}
                      defaultMessage={"Email Id"}
                    />
                  </th>
                  <th className="col-md-1.5">
                    <FormattedMessage id={"rating"} defaultMessage={"Rating"} />
                  </th>
                  <th className="col-md-1" />
                </tr>
              </thead>
              {this.props.loading ? null : (
                <tbody className="panelTableTBody">
                  { _.get(this.props, "userList.data", "")
                    ? _.map(
                      this.props.userList.data,
                      (item, index) =>
                        item.userType === "driver" ? (
                          <tr key={index}>
                            <td>
                              <Link
                                to={`/driver-profile/${item._id}`}
                                onClick={() => {
                                  this.updateProfile(item);
                                }}
                              >
                                <span
                                  style={{
                                    textDecoration: "underline",
                                    cursor: "pointer"
                                  }}
                                >
                                  {item.fname} {item.lname}
                                </span>
                              </Link>
                            </td>
                            <td>{_.get(item.carDetails, "carModel", "")}</td>
                            <td>{_.get(item.carDetails, "regNo", "")}</td>
                            <td>{item.phoneNo}</td>
                            <td>{item.email}</td>
                            <td>
                              <Rating
                                noofstars={5}
                                ratedStar={item.userRating}
                              />
                            </td>
                            <td>
                              <div style={{float: "right"}}>
                                <Button
                                  className="deactivebutton"
                                  style={{display: "none"}}
                                >
                                    De-Activate
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ) : null
                    )
                    :
                    <div style={{ padding: 15 }}>
                      <span>No of Drivers are Zero </span>
                    </div>
                  }
                </tbody>
              )}
            </table>
          </div>
        </div>
        <Pagination
          className="pagination"
          bsSize="medium"
          prev
          next
          first
          last
          ellipsis
          boundaryLinks
          maxButtons={5}
          items={this.props.meta ? this.props.meta.totalNoOfPages : 1}
          activePage={this.state.activePage}
          onSelect={this.handlePagination}
        />
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    userList: state.users.userList,
    loading: state.users.loading,
    meta: state.users.meta,
    failedUserListApi: state.users.failedUserListApi
  };
}
function bindActions(dispatch) {
  return {
    fetchUsers: (pageNo, driver) =>
      dispatch(UserAction.fetchUsers(pageNo, driver)),
    userprofiledetails: user =>
      dispatch(UserProfileAction.userprofiledetails(user))
  };
}

export default connect(mapStateToProps, bindActions)(DriversList);

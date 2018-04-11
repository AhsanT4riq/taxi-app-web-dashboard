import React, {Component} from "react";
import {connect} from "react-redux";
import {Pagination, Button} from "react-bootstrap";
import PropTypes from "prop-types";
import _ from "lodash";
import {FormattedMessage} from "react-intl";
import UserAction from "../../../../redux/users/action";
import UserProfileAction from "../../../../redux/userProfile/action";
import Rating from "../../../../components/UserRatingComponent";
import {Link} from "react-router-dom";
import "../../../../styles/common/CustomerList.scss";

class CustomerList extends Component {
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
    this.props.fetchUsers(this.state.activePage, "rider");
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
    this.props.fetchUsers(eventkey, "rider");
  }
  render() {
    return (
      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
        <div className="panel panel-primary">
          <div className="panel-heading panelheading">
            <span>
              {" "}
              <FormattedMessage
                id={"customer_list"}
                defaultMessage={"CustomerList"}
              />
            </span>
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
                      id={"contact_no"}
                      defaultMessage={"Contact No."}
                    />
                  </th>
                  <th className="col-md-2.5">
                    {" "}
                    <FormattedMessage
                      id={"email_id"}
                      defaultMessage={"Email Id"}
                    />
                  </th>
                  <th className="col-md-3">
                    {" "}
                    <FormattedMessage
                      id={"address"}
                      defaultMessage={"Address"}
                    />
                  </th>
                  <th className="col-md-1.5">
                    <FormattedMessage id={"rating"} defaultMessage={"Rating"} />
                  </th>
                  <th className="col-md-1" />
                </tr>
              </thead>
              <tbody className="panelTableTBody">
                {_.get(this.props, "userList.data", "")
                  ? _.map(this.props.userList.data,
                    (item, index) =>
                      item.userType === "rider" ? (
                        <tr key={index}>
                          <td>
                            <Link
                              to={`/customer-profile/${item._id}`}
                              onClick={() => {
                                this.updateProfile(item);
                              }}
                            >
                              <span
                                style={{
                                  textDecorspantion: "underline",
                                  cursor: "pointer"
                                }}
                              >
                                {item.fname} {item.lname}
                              </span>
                            </Link>
                          </td>
                          <td>{item.phoneNo}</td>
                          <td>{item.email}</td>
                          <td>{item.homeAddress ? item.homeAddress: "--" }</td>
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
                      <span>No of Customers are Zero </span>
                    </div>
                }
              </tbody>
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
    fetchUsers: (pageNo, rider) =>
      dispatch(UserAction.fetchUsers(pageNo, rider)),
    userprofiledetails: user =>
      dispatch(UserProfileAction.userprofiledetails(user))
  };
}
export default connect(mapStateToProps, bindActions)(CustomerList);

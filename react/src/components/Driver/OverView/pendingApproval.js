import React, {Component} from "react";
import {connect} from "react-redux";
import {ListGroup, ListGroupItem, ButtonToolbar, Button} from "react-bootstrap";
import {FormattedMessage} from "react-intl";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import _ from "lodash";
import UserProfileAction from "../../../redux/userProfile/action";
import UserAction from "../../../redux/userDetails/action";
import "../../../styles/common/driver_overview.scss";

class PendingApproval extends Component {
  static propTypes = {
    approvePendingUsers: PropTypes.object,
    approveSelectedUser: PropTypes.func,
    rejectSelectedUser: PropTypes.func,
    fetchApprovePendingUsers: PropTypes.func,
    pendindusers: PropTypes.object
  };
 constructor(props) {
    super(props);
    this.state = {
      itemid: null,
    };
    this.approveDriver = this.approveDriver.bind(this);
    this.rejectDriver = this.rejectDriver.bind(this);
  }
  componentWillMount() {
    this.props.fetchApprovePendingUsers("driver");
  }
   updateProfile(user) {
    this.props.userprofiledetails(user);
  }
  approveDriver(id, userType) {
    this.props.approveSelectedUser(id, userType);
  }
  rejectDriver(id, userType) {
    this.props.rejectSelectedUser(id, userType);
  }
  render() {
    return (
      <div className="col-lg-4 col-md-6 col-sm-12 col-xs-12">
        <div className="panel panel-primary">
          <div className="panel-heading">
            {" "}
            <FormattedMessage
              id={"pending_approval"}
              defaultMessage="Pending Approval"
            />
          </div>
          <div className="panel-body" style={{ height: 250, overflow: "scroll"}}>
            {_.get(this.props.approvePendingUsers, "success") ? (
              <ListGroup className="pannelListGroup">
                {_.map(this.props.approvePendingUsers.data, item => (
                  <ListGroupItem className="pannelList">
                    <Link
                        to={`/driver-profile/${item._id}`}
                        params={{ eventKey: 2 }}
                        onClick={() => {
                          this.updateProfile(item);
                        }}
                      >
                    <span
                       style={{ color: '#3F7498', textDecoration:' underline', cursor: 'pointer'}}>
                      {item.fname} {item.lname}
                    </span>
                   </Link>
                    <span className="pannelListButtons">
                      <ButtonToolbar>
                        <Button
                          className="pannelListButtonGreen"
                          onClick={() =>
                            this.approveDriver(item._id, item.userType)
                          }
                        >
                          <FormattedMessage
                            id={"approve"}
                            defaultMessage="Approve"
                          />
                        </Button>
                        <Button
                        className="pannelListButtonRed"
                          onClick={() =>
                            this.rejectDriver(item._id, item.userType)
                          }
                        >
                          <FormattedMessage
                            id={"reject"}
                            defaultMessage="Reject"
                          />
                        </Button>
                      </ButtonToolbar>
                    </span>
                  </ListGroupItem>
                ))}
              </ListGroup>
            ) : (
              <span>
                <FormattedMessage
                  id={"no_pending"}
                  defaultMessage="No Pending Approval list for Drivers"
                />{" "}
              </span>
            )}
          </div>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    pendindusers: state.currentUser.userApprovalInfo,
    approvePendingUsers: state.currentUser.approvePendingUsers
  };
}

function bindActions(dispatch) {
  return {
    approveSelectedUser: (id, userType) =>
      dispatch(UserAction.approveSelectedUser(id, userType)),
    rejectSelectedUser: (id, userType) =>
      dispatch(UserAction.rejectSelectedUser(id, userType)),
    fetchApprovePendingUsers: driver =>
      dispatch(UserAction.fetchApprovePendingUsers(driver)),
    userprofiledetails: user =>
      dispatch(UserProfileAction.userprofiledetails(user))
  };
}
export default connect(mapStateToProps, bindActions)(PendingApproval);

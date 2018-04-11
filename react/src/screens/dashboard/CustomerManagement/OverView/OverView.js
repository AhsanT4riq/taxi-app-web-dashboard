import React, {Component} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import _ from "lodash";
import PendingApproval from "../../../../components/Rider/OverView/pendingApproval";
import RecentReview from "../../../../components/Rider/OverView/recentReview";
import ActiveCustomers from "../../../../components/Rider/OverView/activeCustomers";
import UserAction from "../../../../redux/userDetails/action";
import tripAction from "../../../../redux/trips/action";
import "../../../../styles/common/rider_overview.scss";

class OverView extends Component {
  static propTypes = {
    recentReviewedTripList: PropTypes.object,
    fetchRecentReviewedTripDriverRiderDetails: PropTypes.func,
    fetchActiveCustomers: PropTypes.func,
    activeCustomersList: PropTypes.object
  };
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    };
    this.setLoading = this.setLoading.bind(this);
  }
  componentWillMount() {
    this.props.fetchRecentReviewedTripDriverRiderDetails();
    this.props.fetchActiveCustomers();
  }
  setLoading(loading) {
    this.setState({isLoading: loading});
  }
  render() {
    return (
      <div className="row animate trips">
        <div className="row">
          <PendingApproval />
          <RecentReview
            recentReviewList={_.get(this.props, "recentReviewedTripList.data", "")}
          />
        </div>
        <div className="row">
          <ActiveCustomers
            activeCustomersList={_.get(this.props, "activeCustomersList.data", "")}
          />
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    isLoggedIn: state.auth.isLoggedIn,
    loading: state.users.loading,
    meta: state.users.meta,
    recentReviewedTripList: state.trips.recentReviewedTripList,
    activeCustomersList: state.currentUser.activeCustomersList
  };
}
function bindActions(dispatch) {
  return {
    fetchRecentReviewedTripDriverRiderDetails: () =>
      dispatch(tripAction.fetchRecentReviewedTripDriverRiderDetails()),
    fetchActiveCustomers: () => dispatch(UserAction.fetchActiveCustomers())
  };
}
export default connect(mapStateToProps, bindActions)(OverView);

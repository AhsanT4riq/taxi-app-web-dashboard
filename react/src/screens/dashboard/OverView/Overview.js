import React, {Component} from "react";
import _ from "lodash";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import MapViewDrivers from "../../../components/OverView/mapViewDrivers";
import RecentReviewHome from "../../../components/OverView/recentReviewHome";
import DriverStatusBar from "../../../components/OverView/driverStatusBar";
import OnGoingTrips from "../../../components/OverView/onGoingTrips";
import tripAction from "../../../redux/trips/action";

class Users extends Component {
  static propTypes = {
    isLoggedIn: PropTypes.bool,
    loading: PropTypes.bool,
    fetchOngoingTripDriverRiderDetails: PropTypes.func,
    fetchRecentReviewedTripDriverRiderDetails: PropTypes.func,
    meta: PropTypes.object,
    ongoingTripList: PropTypes.object,
    recentReviewedTripList: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      activePage: 1
    };
    this.setLoading = this.setLoading.bind(this);
  }

  componentWillMount() {
    this.props.fetchOngoingTripDriverRiderDetails();
    this.props.fetchRecentReviewedTripDriverRiderDetails();
  }
  componentWillReceiveProps(nextProps) {
    this.setLoading(nextProps.loading);
  }

  setLoading(loading) {
    this.setState({isLoading: loading});
  }

  render() {
    return (
      <div className="animate ">
        <div className="row">
          <MapViewDrivers />
          <RecentReviewHome
            recentReviewedTripDetails={_.get(
              this.props.recentReviewedTripList,
              "data",
              ""
            )}
          />
        </div>
        <div className="row">
          <DriverStatusBar />
        </div>
        <div className="row">
          <OnGoingTrips
            ongoingTripDetails={_.get(this.props, "ongoingTripList.data", "")}
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
    ongoingTripList: state.trips.ongoingTripList,
    recentReviewedTripList: state.trips.recentReviewedTripList
  };
}

function bindActions(dispatch) {
  return {
    fetchOngoingTripDriverRiderDetails: () =>
      dispatch(tripAction.fetchOngoingTripDriverRiderDetails()),
    fetchRecentReviewedTripDriverRiderDetails: () =>
      dispatch(tripAction.fetchRecentReviewedTripDriverRiderDetails())
  };
}

export default connect(mapStateToProps, bindActions)(Users);

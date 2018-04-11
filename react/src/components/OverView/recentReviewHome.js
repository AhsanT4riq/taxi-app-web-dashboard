import React, {Component} from "react";
import moment from "moment";
import "../../styles/common/overView.scss";
import PropTypes from "prop-types";
import {FormattedMessage} from "react-intl";
import RecentReviewRating from "./recentReviewRating";
const profileImage = require('../../resources/images/flat-avatar.png');

export default class RecentReviewHome extends Component {
  static propTypes = {
    recentReviewedTripDetails: PropTypes.array
  };
  timeformat(time) {
    const d = moment(time).format("h:mm a");
    return moment(d, "h:mm a").fromNow();
  }

  render() {
    return (
      <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
        <div className="panel panel-primary">
          <div className="panel-heading">
            {" "}
            <FormattedMessage
              id={"recent_review"}
              defaultMessage={"Recent Review"}
            />
          </div>
          <div className="panel-body reviewList">
            {this.props.recentReviewedTripDetails.length ? (
              this.props.recentReviewedTripDetails.map(item => (
                <div className="reviewListItem">
                  <div className="reviewIconBlock">
                    <img alt="" src={item.profileUrl} className="reviewIconImg" />
                  </div>
                  <div className="reviewTextBlock">
                    <div>
                      <span>{item.driverName}</span>
                      <RecentReviewRating
                        noofstars={5}
                        ratedStar={item.driverRatingByRider}
                      />
                      <span className="rightSpan">{this.timeformat(item.bookingTime)}</span>
                    </div>
                    <p className="reviewComment">{item.driverReviewByRider}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="rightSpan">
                <FormattedMessage
                  id={"no_review"}
                  defaultMessage={"No Review"}
                />
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }
}

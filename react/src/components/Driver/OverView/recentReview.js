import React, {Component} from "react";
import {Table} from "react-bootstrap";
import _ from "lodash";
import PropTypes from "prop-types";
import {FormattedMessage} from "react-intl";
import RecentReviewRating from "../../UserRatingComponent";
import "../../../styles/common/driver_overview.scss";

export default class RecentReview extends Component {
  static propTypes = {
    recentReviewList: PropTypes.array
  };
  render() {
    return (
      <div
        className="col-lg-8 col-md-6 col-sm-12 col-xs-12"
      >
        <div className="panel panel-primary" >
          <div className="panel-heading">
            <FormattedMessage
              id={"recent_review"}
              defaultMessage={"Recent Review"}
            />
          </div>
          <div className="panel-body panelTableBody" style={{ height: 250, overflow: "scroll"}}>
            <Table responsive className="panelTable">
              <thead>
                <tr className="panelTableHead">
                  <th className="col-md-4">
                    <FormattedMessage
                      id={"description"}
                      defaultMessage={"Description"}
                    />
                  </th>
                  <th className="col-md-3">
                    <FormattedMessage
                      id={"customer_name"}
                      defaultMessage={"Customer Name"}
                    />
                  </th>
                  <th className="col-md-3">
                    <FormattedMessage
                      id={"driver_name"}
                      defaultMessage={"Driver Name"}
                    />
                  </th>
                  <th className="col-md-2">
                    <FormattedMessage id={"status"} defaultMessage={"Status"} />
                  </th>
                </tr>
              </thead>
              <tbody className="panelTableTBody">
                {
                  _.get(this.props, "recentReviewList.length", "")
                  ?
                  _.map(this.props.recentReviewList,(item, index) => (
                  <tr key={index}>
                    <td>{item.driverReviewByRider}</td>
                    <td>{item.riderName}</td>
                    <td>{item.driverName}</td>
                    <td>
                      <RecentReviewRating
                        noofstars={5}
                        ratedStar={item.driverRatingByRider}
                      />
                    </td>
                  </tr>
                ))
                :
                <div style={{ padding: 15 }}>
                  <span>No Recent Reviews</span>
                  </div>
              }
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    );
  }
}

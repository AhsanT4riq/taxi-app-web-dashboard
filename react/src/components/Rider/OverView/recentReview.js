import React, { Component } from "react";
import { Table } from "react-bootstrap";
import PropTypes from "prop-types";
import RecentReviewRating from "../../UserRatingComponent";
import "../../../styles/common/rider_overview.scss";

export default class RecentReview extends Component {
  static propTypes = {
    recentReviewList: PropTypes.array
  };
  render() {
    return (
      <div
        className="col-lg-8 col-md-6 col-sm-12 col-xs-12"
        style={{display: "none"}}
      >
        <div className="panel panel-primary">
          <div className="panel-heading">Recent Review</div>
          <div className="panel-body panelTableBody" style={{ height: 250, overflow: "scroll"}}>
            <Table responsive className="panelTable">
              <thead>
                <tr className="panelTableHead">
                  <th className="col-md-4">Description</th>
                  <th className="col-md-3">Driver Name</th>
                  <th className="col-md-3">Customer Name</th>
                  <th className="col-md-2">Status</th>
                </tr>
              </thead>
              <tbody className="panelTableTBody">
                {this.props.recentReviewList.map((item, index) => (
                  <tr key={index}>
                    <td>{item.riderReviewByDriver}</td>
                    <td>{item.driverName}</td>
                    <td>{item.riderName}</td>
                    <td>
                      <RecentReviewRating
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
      </div>
    );
  }
}

import React, { Component } from "react";
import { Table } from "react-bootstrap";
import _ from "lodash";
import PropTypes from "prop-types";
import "../../../styles/common/driver_overview.scss";

class ActiveDrivers extends Component {
  static propTypes = {
    activeDriversList: PropTypes.array
  };
  render() {

    console.log('Active Drivers', this.props.activeDriversList)
    return (
      <div
        className="col-lg-12 col-md-12 col-sm-12 col-xs-12"
      >
        <div className="panel panel-primary">
          <div className="panel-heading">Active Drivers</div>
          <div className="panel-body panelTableBody">
            <Table responsive className="panelTable">
              <thead>
                <tr className="panelTableHead">
                  <th className="col-md-1">Name</th>
                  <th className="col-md-1">Vehicle</th>
                  <th className="col-md-1">Reg No.</th>
                  <th className="col-md-1">BoosterSeat</th>
                  <th className="col-md-2">Contact No.</th>
                  <th className="col-md-2">State</th>
                  <th className="col-md-2">City</th>
                </tr>
              </thead>
              <tbody className="panelTableTBody">
                {_.get(this.props, "activeDriversList.length", "")
                  ? _.map(this.props.activeDriversList, (item, index) => (
                    <tr key={index}>
                      <td>
                        {item.fname} {item.lname}
                      </td>
                      <td>{_.get(item.carDetails, "carModel")}</td>
                      <td>{_.get(item.carDetails, "regNo")}</td>
                      <td >{item.boosterSeatNum ? item.boosterSeatNum : "Not Available" }</td>
                      <td>{item.phoneNo ? item.phoneNo : "--" }</td>
                      <td>{item.state ? item.state : "--" }</td>
                      <td>{item.city ? item.city : "--" }</td>
                    </tr>
                  ))
                  :
                  <div style={{ padding: 15 }}>
                  <span>No active Drivers</span>
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
export default ActiveDrivers;

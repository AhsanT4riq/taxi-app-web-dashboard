import React, { Component } from "react";
import { Table } from "react-bootstrap";
import PropTypes from "prop-types";
import "../../../styles/common/rider_overview.scss";

class ActiveCustomers extends Component {
  static propTypes = {
    activeCustomersList: PropTypes.array
  };
  render() {
    return (
      <div
        className="col-lg-12 col-md-12 col-sm-12 col-xs-12"
        style={{ display: "none" }}
      >
        <div className="panel panel-primary">
          <div className="panel-heading">Active Customers</div>
          <div className="panel-body panelTableBody">
            <Table responsive className="panelTable">
              <thead>
                <tr className="panelTableHead">
                  <th className="col-md-2">Name</th>
                  <th className="col-md-2">Phone No.</th>
                  <th className="col-md-2">Email Id</th>
                  <th className="col-md-4">Address</th>
                  <th className="col-md-2">Status</th>
                </tr>
              </thead>
              <tbody className="panelTableTBody">
                {this.props.activeCustomersList
                  ? this.props.activeCustomersList.map((item,index) => (
                    <tr key={index}>
                      <td>
                        {item.fname} {item.lname}
                      </td>
                      <td>{item.phoneNo}</td>
                      <td>{item.email}</td>
                      <td>{item.address}</td>
                      <td>{item.currTripState}</td>
                    </tr>
                  ))
                  : null}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    );
  }
}
export default ActiveCustomers;

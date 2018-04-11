import React, {Component} from "react";
import {Table} from "react-bootstrap";
import moment from "moment";
import "../../styles/common/overView.scss";
import {FormattedMessage} from "react-intl";
export default class OnGoingTrips extends Component {

   formatDate(bookingTime) {
   return moment(bookingTime).format("h:mm a");
 }
  render() {
    return (
      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
        <div className="panel panel-primary">
          <div className="panel-heading">
            {" "}
            <FormattedMessage
              id={"ongoing_trips"}
              defaultMessage={"Ongoing Trips"}
            />
          </div>
          <div className="panel-body panelTableBody">
            <Table responsive className="panelTable">
              <thead>
                <tr className="panelTableHead">
                  <th className="col-lg-1">
                    <FormattedMessage
                      id={"trip_code"}
                      defaultMessage={"Trip Code"}
                    />
                  </th>
                  <th className="col-lg-4">
                    {" "}
                    <FormattedMessage
                      id={"start_from"}
                      defaultMessage={"Starting From"}
                    />
                  </th>
                  <th className="col-lg-1">
                    {" "}
                    <FormattedMessage id={"time"} defaultMessage={"Time"} />
                  </th>
                  <th className="col-lg-3">
                    {" "}
                    <FormattedMessage
                      id={"driver_name"}
                      defaultMessage={"Driver Name"}
                    />
                  </th>
                  <th className="col-lg-3">
                    {" "}
                    <FormattedMessage
                      id={"user_name"}
                      defaultMessage={"User Name"}
                    />
                  </th>
                </tr>
              </thead>
              <tbody className="panelTableTBody">
                {this.props.ongoingTripDetails.length
                  ? this.props.ongoingTripDetails.map((item, index) => (
                    <tr key={index}>
                      <td>{item._id}</td>
                      <td>{item.pickUpAddress.substring(0, 50)}{"..."}</td>
                      <td>
                        {this.formatDate(item.bookingTime)}
                      </td>
                      <td>{item.driverName}</td>
                      <td>{item.riderName}</td>
                    </tr>
                  ))
                  :
                   <div style={{ padding: 15 }}>
                     <div style={{width: 200}}>No Ongoing trips</div>
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


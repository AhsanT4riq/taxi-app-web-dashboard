import React, { Component } from "react";
import "../../styles/common/overView.scss";

export default class DriverStatusBar extends Component {
  render() {
    return (
      <div
        className="col-lg-12 col-md-12 col-sm-12 col-xs-12 driverStatusBar"
        style={{ display: "none" }}
      >
        <div
          style={{ width: "40%" }}
          className="text-center driverStatusBarGreen"
        >
          Drivers Active 40{"%"}
        </div>
        <div style={{ width: "20%" }} className="text-center driverStatusBlue">
          Drivers on trip 20{"%"}
        </div>
        <div
          style={{ width: "40%" }}
          className="text-center driverStatusBarGrey"
        >
          Drivers off line 40{"%"}
        </div>
      </div>
    );
  }
}

import React from "react";
import {BrowserRouter as Router, Route, Redirect} from "react-router-dom";


const Refresh = () => (
  <Route
    render={() => {
        return  <Redirect from="/home" to="/" />
    }
    }
  />
)

export default Refresh;

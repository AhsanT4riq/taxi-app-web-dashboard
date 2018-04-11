import Home from "../screens/dashboard/OverView";
import React from "react";
import _ from "lodash";
import Login from "../components/Login";
import ServerConfig from "../screens/dashboard/ServerConfiguration";
import DriverOverView from "../screens/dashboard/DriverManagement/OverView";
import DriverList from "../screens/dashboard/DriverManagement/DriverList";
import MobileConfig from "../screens/dashboard/MobileAppConfiguration";
import Layout from "../components/Layout/layout";
import AddDriver from "../screens/dashboard/DriverManagement/AddDriver";
import CustomerList from "../screens/dashboard/CustomerManagement/CustomerList";
// import AdminArea from "../screens/dashboard/AdminArea";
import AdminProfile from "../screens/dashboard/AdminArea/AdminProfile";
import CreateAdmin from "../screens/dashboard/AdminArea/CreateAdmin";
import DriverProfile from "../screens/dashboard/DriverManagement/DriverList/DriverProfile";
import AddCustomer from "../screens/dashboard/CustomerManagement/AddCustomer";
import Rider from "../screens/dashboard/CustomerManagement/OverView";
import CustomerProfile from "../screens/dashboard/CustomerManagement/CustomerList/CustomerProfile";
import {BrowserRouter as Router, Route, Redirect} from "react-router-dom";
import Authorization from "../components/Authorization/Authiorization";
import Refresh from "../components/Authorization/Onrefresh";


const Routes = () => (
  <Router>
    <div>
      <Route exact path="/" component={Login} />
      <Route
        exact
        path="/server-configuration"
        component={
          !localStorage.getItem("id_token") ?

          Refresh
          :
          Authorization(['superAdmin'])(ServerConfig)
        }
      />
      <Route
        exact
        path="/home"
        component={
          !localStorage.getItem("id_token") ?

          Refresh
          :
          Authorization(['superAdmin','admin'])(Home)
        }
      />
      <Route
        exact
        path="/add-customer"
        component={
          !localStorage.getItem("id_token") ?

          Refresh
          :
          Authorization(['superAdmin','admin'])(AddCustomer)
        }
      />
      <Route
        exact
        path="/add-driver"
         component={
          !localStorage.getItem("id_token") ?

          Refresh
          :
          Authorization(['superAdmin','admin'])(AddDriver)
        }
      />
      <Route
       exact
       path="/driver-profile/:Id"
      //  component={DriverProfile}
        component={
          !localStorage.getItem("id_token") ?

          Refresh
          :
          Authorization(['superAdmin','admin'])(DriverProfile)
        }
       />

      <Route
        exact
        path="/driver"
        component={
          !localStorage.getItem("id_token") ?

          Refresh
          :
          Authorization(['superAdmin','admin'])(DriverOverView)
        }
      />
      <Route
        exact
        path="/driver-list"
         component={
          !localStorage.getItem("id_token") ?

          Refresh
          :
          Authorization(['superAdmin','admin'])(DriverList)
        }
      />
      <Route
        exact
        path="/customer"
         component={
          !localStorage.getItem("id_token") ?

          Refresh
          :
          Authorization(['superAdmin','admin'])(Rider)
        }
      />
      <Route
        exact
        path="/customer-profile/:Id"
        component={
          !localStorage.getItem("id_token") ?

          Refresh
          :
          Authorization(['superAdmin','admin'])(CustomerProfile)
        }
      />
      <Route
        exact
        path="/customer-list"
        component={
          !localStorage.getItem("id_token") ?

          Refresh
          :
          Authorization(['superAdmin','admin'])(CustomerList)
        }
      />
      <Route
        exact
        path="/mobile-app-configuration"
         component={
          !localStorage.getItem("id_token") ?

          Refresh
          :
          Authorization(['superAdmin'])(MobileConfig)
        }
      />
      <Route
        exact
        path="/admin-profile"
         component={
          !localStorage.getItem("id_token") ?

          Refresh
          :
          Authorization(['superAdmin', 'admin'])(AdminProfile)
        }
      />
      <Route
        exact
        path="/create-admin"
        component={
          !localStorage.getItem("id_token") ?

          Refresh
          :
          Authorization(['superAdmin'])(CreateAdmin)
        }
        // render={() =>
        //   !localStorage.getItem("id_token") ? (
        //     <Redirect from="/home" to="/" />
        //   ) : (
        //     <CreateAdmin />
        //   )
        // }
      />
    </div>
  </Router>
);
export default Routes;

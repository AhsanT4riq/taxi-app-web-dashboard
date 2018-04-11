import config from "./apiConfig.js";
// import {store} from '../redux/reducers';

const io = require("socket.io-client");
let socket = null;
// let token = null;
let tokenj = localStorage.getItem("id_token");
export function socketAdminInit() {
  // console.log("store heree", tokenj);
  socket = io(`${config.serverUrl}:${config.port}`, {
    jsonp: false,
    transports: ["websocket"],
    query: "token="+tokenj
    // ${storeObj.getState().auth.user.jwtAccessToken}`,
  });
  socket.on("connect", () => {
    // console.log("connected");
    // socket.emit('getDriverDetails', data);
  });
  socket.on("getDriverDetails", data => {
    // console.log("getdriver", data);
  });
  // socket.emit('getDriverDetails');
  socket.on("disconnect", () => {
    // console.log("disconnected");
  });
  // socket.on('responseTimedOut', () => {
  //   console.log('timeout');
  // });
  // socket.on('updateDriverLocation', gpsLoc => {
  //   console.log('gps loc', gpsLoc);
  // });
  // socket.on('updateLocation', gpsLoc => {
  //   console.log('updated loc', gpsLoc);
  // });
  // socket.on('socketError', e => {
  //   alert(e);
  // });
}

// export function updateLocation(user) {
//   socket.emit('updateLocation', user);
// }

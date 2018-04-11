import React, {Component} from "react";
import {Form, FormGroup, ControlLabel, FormControl, Button} from "react-bootstrap";
import PropTypes from "prop-types";
import request from 'superagent';
import Toast from "../../Toast";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {FormattedMessage} from "react-intl";
import UserAction from "../../../redux/users/action";
import "../../../styles/common/add_driver.scss";
import VehicleInfoForm from "./vehicleInfoForm";

class VehicleInfo extends Component {
  static propTypes = {
    vehicleobj: PropTypes.object,
    onUpdateVehicleInfo: PropTypes.func,
    uploadDriverFiles: PropTypes.func,
  };
  constructor(props) {
    super(props);
    this.state = {
      st: null,
      stn: null,
      div: null,
      num: null,
      carDetails: {
        type: null,
        company: null,
        regNo: null,
        RC_ownerName: null,
        vehicleNo: null,
        carModel: null
      },
      vehicleDocuments: {
        insuranceUrl: null,
        rcBookUrl: null,
      },
      file1: '',
      file2: '',
      imagePreviewUrl: '',
      imageRegPreviewUrl: ''
    };
  }
  handleChange(inputname, value, label) {
    if (inputname === "state") {
      this.setState({st: value});
    } else if (inputname === "sno") {
      this.setState({stn: value});
    } else if (inputname === "div") {
      this.setState({div: value});
    } else if (inputname === "vehicleno") {
      this.setState({num: value});
      const vno = this.state.st + this.state.stn + this.state.div + value;
      this.state.carDetails["vehicleNo"] = vno;
      this.props.onUpdateVehicleInfo("carDetails", this.state.carDetails);
    } else {
      this.state.carDetails[inputname] = value;
      this.props.onUpdateVehicleInfo("carDetails", this.state.carDetails);
    }
  }
  handleVehicleNo(label) {
    const vno =
      this.state.st + this.state.stn + this.state.div + this.state.num;
    this.props.onUpdateVehicleInfo(vno, label, true);
  }



  _handleImageChange(e, type) {
    e.preventDefault();
    var fileTypes = ['jpg', 'jpeg', 'png'];
    if(e.target.files[0]) {
       var extension = e.target.files[0].name.split('.').pop().toLowerCase(),  //file extension from input file
        isSuccess = fileTypes.indexOf(extension) > -1;
    if(isSuccess) {
    let reader = new FileReader();
    let file = e.target.files[0];
    let filezzzz = URL.createObjectURL(e.target.files[0]);
      reader.onloadend = () => {
        type === 'insurance' ?(
        this.setState({
          file1: file,
          imagePreviewUrl: reader.result,
        }),
        this.handleImageUploadcloudinary(reader.result, type)
      )
        :(
         this.setState({
          file2: file,
          imageRegPreviewUrl: reader.result
        }),
        this.handleImageUploadcloudinary(reader.result, type)
      )
      }
    reader.readAsDataURL(file)
    } else {
      type === 'insurance' ?
        this.setState({
          file1: '',
          imagePreviewUrl: ''
        })
        :
         this.setState({
          file2: '',
          imageRegPreviewUrl: ''
        })
      alert("only '.jpg' , '.jpeg' , '.png' file types are accepted");
    }
    } else {
     type === 'insurance' ?
        this.setState({
          file1: '',
          imagePreviewUrl: ''
        })
        :
         this.setState({
          file2: '',
          imageRegPreviewUrl: ''
        })
    }
  }

   handleImageUploadcloudinary(file, type) {
    let upload = request.post('https://api.cloudinary.com/v1_1/taxiapp1/upload')
                        .field('upload_preset', "bkfchx7x")
                        .field('file', file);

    upload.end((err, response) => {
      if (err) {
        console.error(err);
      }

      if (response.body.secure_url !== '') {
        if(type === "insurance") {
           this.state.vehicleDocuments['insuranceUrl'] = response.body.secure_url,
           this.props.onUpdateVehicleInfo("vehicleDocuments", this.state.vehicleDocuments)
        } else {
           this.state.vehicleDocuments['rcBookUrl'] = response.body.secure_url,
           this.props.onUpdateVehicleInfo("vehicleDocuments", this.state.vehicleDocuments)
        }
      }
    });
  }

  render() {
    return (
      <div className="col-lg-8 col-md-8 col-sm-12 col-xs-12">
        <div className="panel panel-primary adddriverpanel" >
          <div className="panel-heading">
            <span>
              {" "}
              <FormattedMessage
                id={"vehicle_info"}
                defaultMessage={"Vehicle Info"}
              />
            </span>
          </div>
          <div className="panel-body" style={{height: 700, overflow: 'scroll'}}>
            <VehicleInfoForm
              OnformBlur={(name, val, label) =>
                this.handleChange(name, val, label)
              }
            />
            <div className="previewComponent">
              <Form>
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <label className="col-lg-2 col-md-2 col-sm-2 col-xs-2" style={{marginTop: 20}}>Insurance Certificate:</label>
                  <input className="col-lg-10 col-md-10 col-sm-10 col-xs-10 fileInput fileInputvehicle"
                    type="file"
                    onChange={(e)=>this._handleImageChange(e, 'insurance')} />
                </div>
                <Button style={{border: 'none'}}/>
              </Form>
              <div className="imgPreview col-md-offset-2 col-sm-offset-2 col-lg-offset-2">
                {
                  this.state.imagePreviewUrl ?
                    <img alt="Insurance" src={this.state.imagePreviewUrl} />
                  :
                   <div className="previewText">Please select an Image for Preview</div>
                }
              </div>
            </div>
            <div className="previewComponent">
              <Form>
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <label className="col-lg-2 col-md-2 col-sm-2 col-xs-2" style={{marginTop: 20}}>Registration Certificate:</label>
                  <input className="col-lg-10 col-md-10 col-sm-10 col-xs-10 fileInput fileInputvehicle"
                    type="file"
                    onChange={(e)=>this._handleImageChange(e, 'register')} />
                </div>
                <Button style={{border: 'none'}}/>
              </Form>
              <div className="imgPreview col-md-offset-2 col-sm-offset-2 col-lg-offset-2">
                {
                  this.state.imageRegPreviewUrl ?
                     <img alt="Reg" src={this.state.imageRegPreviewUrl} />
                  :
                  <div className="previewText">Please select an Image for Preview</div>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

function bindActions(dispatch) {
  return {
    uploadDriverFiles: image => dispatch(UserAction.uploadDriverFiles(image))
  };
}

export default withRouter(connect(mapStateToProps, bindActions)(VehicleInfo));

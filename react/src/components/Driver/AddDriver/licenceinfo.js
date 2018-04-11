import React, {Component} from "react";
import {Form, FormGroup, ControlLabel, FormControl,Button} from "react-bootstrap";
import PropTypes from "prop-types";
import request from 'superagent';
import {FormattedMessage} from "react-intl";
import "../../../styles/common/add_driver.scss";
import LicenceInfoForm from "./licenceInfoForm";

class LIcenceInfo extends Component {
  static propTypes = {
    licenceobj: PropTypes.object,
    onUpdateLicenceInfo: PropTypes.func
  };
  constructor(props) {
    super(props);
    this.state = {
      mm: null,
      dd: null,
      yyyy: null,
      licenceDetails: {
        licenceNo: null,
        issueDate: null,
        expDate: null
      },
       licenceDocuments:{
        licenceUrl: null,
        vechilePaperUrl: null,
      },
      file1: '',
      file2: '',
      imagePreviewUrl: '',
      imagePermitPreviewUrl: ''
    };
  }
  handleChange(inputname, value, label) {
    if (inputname === "month" || inputname === "emonth") {
      this.setState({mm: value});
      const date = `${this.state.mm}/${this.state.dd}/${this.state.yyyy}`;
    } else if (inputname === "date" || inputname === "edate") {
      this.setState({dd: value});
      const date = `${this.state.mm}/${this.state.dd}/${this.state.yyyy}`;
    } else if (inputname === "year" || inputname === "eyear") {
      this.setState({yyyy: value});
      const date = `${this.state.mm}/${this.state.dd}/${value}`;

      label === "Id"
        ? (this.state.licenceDetails["issueDate"] = date)
        : (this.state.licenceDetails["expDate"] = date);
      this.props.onUpdateLicenceInfo(
        "licenceDetails",
        this.state.licenceDetails
      );
    } else {
      this.state.licenceDetails["licenceNo"] = value;
      this.props.onUpdateLicenceInfo(
        "licenceDetails",
        this.state.licenceDetails
      );
    }
  }
  handleIssueDate(label) {
    const date = `${this.state.Imm}/${this.state.Idd}/${this.state.Iyyyy}`;
    this.props.onUpdateLicenceInfo(date, label, true);
  }
  handleExpDate(label) {
    const date = `${this.state.Emm}/${this.state.Edd}/${this.state.Eyyyy}`;
    this.props.onUpdateLicenceInfo(date, label, true);
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

    reader.onloadend = () => {
      type === 'licence' ?
      (
      this.setState({
        file1: file,
        imagePreviewUrl: reader.result
      }),
       this.handleImageUploadcloudinary(reader.result, type)
    )
      :
      (
      this.setState({
        file2: file,
        imagePermitPreviewUrl: reader.result
      }),
      this.handleImageUploadcloudinary(reader.result, type)
    )
    }
    reader.readAsDataURL(file)
    } else {
     type === 'licence' ?
      this.setState({
        file1: '',
        imagePreviewUrl: ''
      })
      :
      this.setState({
        file2: '',
        imagePermitPreviewUrl: ''
      })
      alert("only '.jpg' , '.jpeg' , '.png' file types are accepted");
    }
  } else {
    type === 'licence' ?
      this.setState({
        file1: '',
        imagePreviewUrl: ''
      })
      :
      this.setState({
        file2: '',
        imagePermitPreviewUrl: ''
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
        if(type === "licence") {
            this.state.licenceDocuments['licenceUrl'] = response.body.secure_url,
            this.props.onUpdateLicenceInfo("licenceDocuments", this.state.licenceDocuments)
        } else {
           this.state.licenceDocuments['vechilePaperUrl'] = response.body.secure_url,
           this.props.onUpdateLicenceInfo("licenceDocuments", this.state.licenceDocuments)
        }
      }
    });
  }

  render() {
    return (
      <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
        <div className="panel panel-primary adddriverpanel">
          <div className="panel-heading">
            <span>
              {" "}
              <FormattedMessage
                id={"license_info"}
                defaultMessage={"License Info"}
              />
            </span>
          </div>
          <div className="panel-body" style={{height: 700, overflow: 'scroll'}}>
            <LicenceInfoForm
              OnformBlur={(name, val, label) =>
                this.handleChange(name, val, label)
              }
            />
            <div className="previewComponent">
              <Form>
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <label className="col-lg-4 col-md-4 col-sm-4 col-xs-4" style={{marginTop: 10}}>Licence Certificate:</label>
                  <input className="col-lg-8 col-md-8 col-sm-8 col-xs-8 fileInput fileInputLicence"
                    type="file"
                    onChange={(e)=>this._handleImageChange(e, 'licence')} />
                </div>
                  <Button style={{border: 'none'}} />
              </Form>
              <div className="imgPreview1 col-md-offset-4 col-sm-offset-4 col-lg-offset-4">
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
                  <label className="col-lg-4 col-md-4 col-sm-4 col-xs-4" style={{marginTop: 10}}>Carriage permit:</label>
                  <input className="col-lg-8 col-md-8 col-sm-8 col-xs-8 fileInput fileInputLicence"
                    type="file"
                    onChange={(e)=>this._handleImageChange(e, 'permit')} />
                </div>
                <Button style={{border: 'none'}} />
              </Form>
              <div className="imgPreview1 col-md-offset-4 col-sm-offset-4 col-lg-offset-4">
                {
                  this.state.imagePermitPreviewUrl ?
                    <img alt="Insurance" src={this.state.imagePermitPreviewUrl} />
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
export default LIcenceInfo;

import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import './external-storage.css';
import backBtn from '../../../assets/images/back-icon.svg';
// import workInProgress from '../../../assets/images/work-in-progress.png';

import NavBar from '../../../components/nav-bar/nav-bar';
import FilesList from '../components/files-list/files-list';
import FileItem from '../components/file-item/file-item';
import Button from '../../../components/button/button';
import Backdrop from '../../../components/backdrop/backdrop';
import Modal from '../../../components/modal/modal';


import startPrint from '../../../services/api/start-print';
import getUsbPrintFiles from '../../../services/api/get-usb-print-files';
import copyUsbFile from '../../../services/api/copy-usb-file';
import getGcodeData from '../../../services/api/get-gcode-data';

class ExternalStorage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      files: null,
      modalOpen: false,
      printFileName: null,
      printFilePath: null,
      copySuccess: false,
      gcodeData: null
    };
  }

  onGettingGcodeData = (data) => {
    console.log(data);
    this.setState({
      ...this.state,
      gcodeData: data
    });
    this.props.onUpdateGcodeData(this.state.gcodeData);
    this.props.history.goBack();
  }

  onUsbFileReceived = (res) => {
    this.setState({
      ...this.state,
      files: res.data
    });
  }

  onFileSeleted = (file) => {
    this.setState({
      ...this.state,
      modalOpen: true,
      printFileName: file.filename,
      printFilePath: file.fullpath
    });
  }

  onCopyFile = (res) => {
    this.setState({
      ...this.state,
      copySuccess: true
    });
  }

  onPrintClicked = () => {
    this.setState({
      ...this.state,
      modalOpen: false
    });
    getGcodeData(this.onGettingGcodeData, this.state.printFileName);
  }

  onBackDropClicked = () => {
    this.setState({
      ...this.state,
      modalOpen: false
    });
  }

  componentDidMount() {
    getUsbPrintFiles(this.onUsbFileReceived);
  }

  componentWillReceiveProps() {
    getUsbPrintFiles(this.onUsbFileReceived);
  }

  render() {
    let files = [];
    let msg = (
      <div className="loading-content">
        <p className="loading-msg">No USB Detected</p>
        <p className="loading-msg">Insert the USB properly and hit RELOAD again.</p>
      </div>
    );

    const alert = (
      <Backdrop clicked={this.onBackDropClicked} modalOpen={this.state.modalOpen}>
        <Modal
          modalOpen={this.state.modalOpen}
          content={this.state.printFileName}
          question={'Do you want to continue print?'}
          isBtnDisabled={this.state.copySuccess}
          origin={"External Storage"}
          actions={{
            leftBtn: {
              name: 'Copy File',
              classValue: 'btn',
            },
            rightBtn: {
              name: 'Print',
              classValue: 'btn--green'
            }
          }}
          rightBtnClick={() => startPrint(this.onPrintClicked, this.state.printFileName)}
          leftBtnClick={() => copyUsbFile(this.onCopyFile, {filename: this.state.printFileName, filepath: this.state.printFilePath})}
        />
      </Backdrop>
    );

    if (this.state.files !== null) {
      for (let key in this.state.files) {
        const item = this.state.files[key];
        files.push(
          <FileItem
            key={key + item.filename}
            print={() => this.onFileSeleted(item)}
          >
            {item.filename}
          </FileItem>
        );
      }
    }

    return (
      <div className="external-storage-container">
        {alert}
        <NavBar>
          <NavLink exact to="/">
            <img src={backBtn} alt="Back" width="56" height="56" />
          </NavLink>
          <h1 className="nav-heading nav-heading--with-btn">External Storage</h1>
          <Button
            classValue={"btn--control btn--no-radius btn--gray"}
            clicked={() => getUsbPrintFiles(this.onUsbFileReceived)}
            name={"Reload"}
          />
        </NavBar>
        <p className="msg">{files.length !== 0 ? "Choose the file you want to print" : null}</p>
        <div className="file-list-container">
          <FilesList>
            {files.length !== 0 ? files : msg}
          </FilesList>
        </div>
      </div>
    );
  }
}

/* Subscribing to the Redux state change */

const mapStateToProps = (state) => {
  return {
    usbStatus: state.socketData.socketData.usbStatus
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onUpdateGcodeData: (gcodeData) => {
      dispatch({
        type: 'UPDATE_GCODE_DATA',
        value: gcodeData
      })
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ExternalStorage);
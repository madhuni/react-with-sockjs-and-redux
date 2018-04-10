import React , { Component } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';

import './internal-storage.css';
import backBtn from '../../../assets/images/back-icon.svg';

import NavBar from '../../../components/nav-bar/nav-bar';
import FilesList from '../components/files-list/files-list';
import FileItem from '../components/file-item/file-item';
import Button from '../../../components/button/button';
import Backdrop from '../../../components/backdrop/backdrop';
import Modal from '../../../components/modal/modal';

import getLocalPrintFiles from '../../../services/api/get-local-print-files';
import startPrint from '../../../services/api/start-print';
import deleteLocalFile from '../../../services/api/delete-local-file';
import getGcodeData from '../../../services/api/get-gcode-data';

class InternalStorage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      files: [],
      modalOpen: false,
      printFileName: null,
      gcodeData: null,
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

  onPrintFilesReceived = (res) => {
    this.setState({
      ...this.state,
      files: res.data
    });
  }

  onFileSelected = (file) => {
    this.setState({
      ...this.state,
      modalOpen: true,
      printFileName: file.name
    });
  }

  onPrintClicked = () => {
    this.setState({
      ...this.state,
      modalOpen: false
    });
    getGcodeData(this.onGettingGcodeData, this.state.printFileName);
    // setTimeout(() => {
    //   this.props.history.goBack();
    // }, 5000);
  }

  onDeleteClicked = (filename) => {
    this.setState({
      ...this.state,
      modalOpen: false
    });

    getLocalPrintFiles(this.onPrintFilesReceived);
  }

  onBackDropClicked = () => {
    this.setState({
      ...this.state,
      modalOpen: false
    });
  }

  componentDidMount() {
    getLocalPrintFiles(this.onPrintFilesReceived);
  }

  render() {
    let files = [];
    let msg = (
      <div className="loading-content">
        <i className="fa fa-spinner fa-spin" style={{fontSize: '40px', color: 'orange'}}/>
        <p className="loading-msg">Fetching the files...</p>
        <p className="loading-msg">Please hit RELOAD if it's taking too long</p>
      </div>
    );

    const alert = (
      <Backdrop clicked={this.onBackDropClicked} modalOpen={this.state.modalOpen}>
        <Modal
          modalOpen={this.state.modalOpen}
          // filename={this.state.printFileName}
          content={this.state.printFileName}
          question={'Do you want to continue print?'}
          actions={{
            leftBtn: {
              name: 'Delete',
              classValue: 'btn--danger',
            },
            rightBtn: {
              name: 'Print',
              classValue: 'btn--green'
            }
          }}
          rightBtnClick={() => startPrint(this.onPrintClicked, this.state.printFileName)}
          leftBtnClick={() => deleteLocalFile(this.onDeleteClicked, this.state.printFileName)}
        />
      </Backdrop>
    );

    if (this.state.files !== null) {
      for (let i = 0; i < this.state.files.length; i++) {
        files.push(
          <FileItem
            key={this.state.files[i].id}
            print={() => this.onFileSelected(this.state.files[i])}
          >
            {this.state.files[i].name}
          </FileItem>
        );
      }
    }

    return(
      <div className="internal-storage-container">
        {/* {this.state.modalOpen ? alert : null} */}
        {alert}
        <NavBar>
          <NavLink exact to="/">
            <img src={backBtn} alt="Back" width="56" height="56" />
          </NavLink>
          <h1 className="nav-heading nav-heading--with-btn">Internal Storage</h1>
          <Button
            classValue={"btn--control btn--no-radius btn--gray"}
            clicked={() => getLocalPrintFiles(this.onPrintFilesReceived)}
            name={"Reload"}
          />
        </NavBar>
        <p className="msg">{files.length !== 0 ? "Choose the file you want to print" : null}</p>
        <div className="files-list-container">
          <FilesList>
            {files.length !== 0 ? files : msg}
          </FilesList>
        </div>
      </div>
    );
  }
}

/* Subscribing to the Redux state change */

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

export default connect(null, mapDispatchToProps)(InternalStorage);
import React, { Component } from 'react';
import { connect } from "react-redux";

import './home.css';

/* Importing all the API services */
import reconnectPrinter from '../../services/api/reconnect-printer';
import switchTool from '../../services/api/switch-tool';
import tempExtruder from '../../services/api/temp-extruder';
import tempBed from '../../services/api/temp-bed';
import pauseCancelPrint from '../../services/api/pause-cancel-print';
import shutdown from '../../services/api/shutdown';
// import getGcodeData from '../../services/api/get-gcode-data';

/* Importing the components */
import NavBar from './components/nav-bar/nav-bar';
import PrintDetails from './components/print-details/print-details';
import ExtruderBedControl from './components/extruder-bed-control/extruder-bed-control';
import Backdrop from '../../components/backdrop/backdrop'
import Modal from '../../components/modal/modal';

class ReceiveUpdate extends Component {

  state = {
    flags: null,
    jobName: null,
    timeTaken: null,
    timeRemaining: null,
    totalLayer: null,
    currentState: null,
    totalTime: null,
    printProgress: null,
    currentLayer: null,
    tool0: null,
    tool1: null,
    bed: null,
    currentTool: null,
    modalOpen: false,
    modalFor: null
  }

  onSwitchTool = (tool) => {
    switchTool(tool);
  }

  onTempExtruder = (tool, temp) => {
    tempExtruder(tool, temp);
  }

  onTempBed = (temp) => {
    tempBed(temp);
  }

  onExtrudeFilament = (tool) => {
    /**
     * On Extrusion command, first switchinng the tool,
     * then Extruding the filament
    */
    this.onSwitchTool(tool);
  }

  onPauseCancelPrint = (action) => {
    pauseCancelPrint(action);
  }

  onCancelPrintBtn = () => {
    this.setState({
      ...this.state,
      modalOpen: true,
      modalFor: 'Cancel Print'
    });
  }

  onCancelPrint = () => {
    // console.log('Cancel print is clicked');
    this.setState({
      ...this.state,
      modalOpen: false
    });
    // this.props.onUpdateGcodeData(null);
    pauseCancelPrint('cancel');
  }

  onReconnectPrinter = () => {
    reconnectPrinter();
  }

  onReconnectServer = () => {
    console.log('Try to reconnet the printer....');
    this._child.connect(" ");
  }

  onPowerButton = () => {
    this.setState({
      ...this.state,
      modalOpen: true,
      modalFor: 'Power'
    });
  }

  onShutDown = () => {
    shutdown();
    this.onBackDropClicked();
  }

  onBackDropClicked = () => {
    // console.log('onBackDropClicked fn is called');
    this.setState({
      ...this.state,
      modalOpen: false
    })
  }

  formatTime = (seconds) => {
    if (seconds === null || isNaN(seconds)) {
      return ['--', '--', '--'];
    }

    var sec_num = parseInt(seconds, 10); // don't forget the second param
    var hours = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours < 10) { hours = "0" + hours; }
    if (minutes < 10) { minutes = "0" + minutes; }
    if (seconds < 10) { seconds = "0" + seconds; }
    return [hours, minutes, seconds];
  }

  getJobName = (file) => {
    if (file !== undefined && file.name !== null) {
      return file.name;
    } else {
      return null;
    }
  }

  getTotalLayer = (layerCount, data) => {
    if (layerCount !== null) {
      return layerCount;
    } else {
      if (data.gcodeData !== null) {
        return data.gcodeData.gcode_data.total_layers;
      } else {
        return "_";
      }
    }
  }

  initialSetup = () => {
    const data = this.props.socketData;
    // console.log(data);

    if (data !== null) {
      this.setState({
        ...this.state,
        jobName: this.getJobName(data.job.file) === null ? "No Job To Print" : this.getJobName(data.job.file),
        totalLayer: this.getTotalLayer(data.job.layerCount, data),
        timeTaken: this.formatTime(data.printProgress.printTime),
        timeRemaining: this.formatTime(data.printProgress.printTimeLeft),
        currentState: (data.currentState !== null) ? data.currentState : "Checking the status...",
        totalTime: data.estimatedPrintTime,
        printProgress: !isNaN(data.printProgress.completion) ? Math.round(data.printProgress.completion * 10) / 10 : "0",
        currentLayer: data.printProgress.currentLayer,
        tool0: data.temps.tool0,
        tool1: data.temps.tool1,
        bed: data.temps.bed,
        flags: data.flags,
        currentTool: data.currentTool
      });
    }
  }

  componentDidMount() {
    console.log(this.props);
    this.initialSetup();
  }

  componentWillReceiveProps() {
    this.initialSetup();
    // console.log(this.state.currentTool);
  }

  componentDidUpdate() {
    // console.log('componentDidUpdate is called');
    // if (this.state.flags && this.state.flags.printing) {
    //   const printFileName = this.state.jobName;
    //   getGcodeData(this.onReceiveLayerCount, printFileName);
    // }
  }

  render() {
    const alert = (
      <Backdrop clicked={this.onBackDropClicked} modalOpen={this.state.modalOpen}>
        <Modal
          modalOpen={this.state.modalOpen}
          content={this.state.modalFor === 'Power' ? 'Shutdown Printer' : 'Cancel Print'}
          question={this.state.modalFor === 'Power' ? 'Do you want to shutdown printer?' : 'Do you want to cancel the print?'}
          actions={{
            leftBtn: {
              name: 'No',
              classValue: '',
            },
            rightBtn: {
              name: (this.state.modalFor === 'Power' ? 'Shutdown' : 'Cancel'),
              classValue: 'btn--danger'
            }
          }}
          rightBtnClick={this.state.modalFor === 'Power' ? this.onShutDown : this.onCancelPrint}
          leftBtnClick={this.onBackDropClicked}
        />
      </Backdrop>
    );

    return (
      <div className="printing-container">
        {alert}
        <NavBar
          currentState={this.state.currentState}
          reconnectPrinter={this.onReconnectPrinter}
          reconnectServer={this.props.serverClicked}
          currentTool={this.state.currentTool}
          flags={this.state.flags}
          shutdown={this.onPowerButton}
        />
        <div className="print-extruder-area flex-row">
          <PrintDetails
            printProgress={this.state.printProgress}
            jobName={this.state.jobName}
            currentLayer={this.state.currentLayer}
            totalLayer={this.state.totalLayer}
            timeTaken={this.state.timeTaken}
            timeRemaining={this.state.timeRemaining}
            pausePrint={() => this.onPauseCancelPrint('pause')}
            cancelPrint={this.onCancelPrintBtn}
            flags={this.state.flags}
            currentState={this.state.currentState}
          />
          <ExtruderBedControl
            tool0={this.state.tool0}
            tool1={this.state.tool1}
            bed={this.state.bed}
            heatTool0={() => this.onTempExtruder('tool0', 200)}
            coolTool0={() => this.onTempExtruder('tool0', 0)}
            heatTool1={() => this.onTempExtruder('tool1', 200)}
            coolTool1={() => this.onTempExtruder('tool1', 0)}
            heatBed={() => this.onTempBed(70)}
            coolBed={() => this.onTempBed(0)}
            extrudeTool1={() => this.onExtrudeFilament('tool0')}
            extrudeTool2={() => this.onExtrudeFilament('tool1')}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    socketData: state.socketData.socketData
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

export default connect(mapStateToProps, mapDispatchToProps)(ReceiveUpdate);
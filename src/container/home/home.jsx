import React, { Component } from 'react';
import { connect } from "react-redux";

import './home.css';

/* Importing all the API services */
import reconnectPrinter from '../../services/api/reconnect-printer';
// import homeExtruderBed from '../../services/api/home-extruder-bed';
import switchTool from '../../services/api/switch-tool';
import tempExtruder from '../../services/api/temp-extruder';
import tempBed from '../../services/api/temp-bed';
import extrudeFilament from '../../services/api/extrude-filament';
// import jogging from '../../services/api/jogging';
import pauseCancelPrint from '../../services/api/pause-cancel-print';

/* Importing the components */
import NavBar from './components/nav-bar/nav-bar';
import PrintDetails from './components/print-details/print-details';
import ExtruderBedControl from './components/extruder-bed-control/extruder-bed-control';

class ReceiveUpdate extends Component {

  state = {
    flags: null,
    jobName: null,
    timeTaken: null,
    totalLayer: null,
    currentState: null,
    totalTime: null,
    printProgress: null,
    currentLayer: null,
    tool0: null,
    tool1: null,
    bed: null,
    currentTool: null
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

  onExtrudeFilament = () => {
    extrudeFilament();
  }

  onPauseCancelPrint = (action) => {
    pauseCancelPrint(action);
  }

  onReconnectPrinter = () => {
    reconnectPrinter();
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

  getTotalLayer = (layerCount) => {
    if (layerCount !== null) {
      return layerCount;
    } else {
      return "_";
    }
  }

  initialSetup = () => {
    const data = this.props.socketData;

    if (data !== null) {
      this.setState({
        ...this.state,
        jobName: this.getJobName(data.job.file) === null ? "No Job To Print" : this.getJobName(data.job.file),
        totalLayer: this.getTotalLayer(data.job.layerCount),
        timeTaken: this.formatTime(data.printProgress.printTime),
        timeRemaining: this.formatTime(),
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
    this.initialSetup();
  }

  componentWillReceiveProps() {
    this.initialSetup();
    // console.log(this.state.currentTool);
  }

  render() {
    return (
      <div className="printing-container">
        <NavBar
          currentState={this.state.currentState}
          reconnectPrinter={this.onReconnectPrinter}
          tool0={() => this.onSwitchTool('tool0')}
          tool1={() => this.onSwitchTool('tool1')}
          currentTool={this.state.currentTool}
        />
        <div className="print-extruder-area flex-row">
          <PrintDetails
            printProgress={this.state.printProgress}
            jobName={this.state.jobName}
            currentLayer={this.state.currentLayer}
            totalLayer={this.state.totalLayer}
            timeTaken={this.state.timeTaken}
            pausePrint={() => this.onPauseCancelPrint('pause')}
            cancelPrint={() => this.onPauseCancelPrint('cancel')}
            flags={this.state.flags}
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
            extrudeTool={this.onExtrudeFilament}
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

export default connect(mapStateToProps)(ReceiveUpdate);
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

  onReconnectPrinter = () => {
    reconnectPrinter();
  }

  onShutDown = () => {
    shutdown();
  }

  // onReceiveLayerCount = (res) => {
  //   const totalLayer = res.data.gcode_data.total_layers;
  //   this.setState({
  //     ...this.state,
  //     totalLayer: totalLayer
  //   });
  //   // console.log('totalLayers are : ', totalLayer);
  // }

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
    // console.log(data);

    if (data !== null) {
      this.setState({
        ...this.state,
        jobName: this.getJobName(data.job.file) === null ? "No Job To Print" : this.getJobName(data.job.file),
        totalLayer: this.getTotalLayer(data.job.layerCount),
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
    return (
      <div className="printing-container">
        <NavBar
          currentState={this.state.currentState}
          reconnectPrinter={this.onReconnectPrinter}
          currentTool={this.state.currentTool}
          flags={this.state.flags}
          shutdown={this.onShutDown}
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
            cancelPrint={() => this.onPauseCancelPrint('cancel')}
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

export default connect(mapStateToProps)(ReceiveUpdate);
import React, { Component } from 'react';
import { connect } from "react-redux";
import CircularProgressbar from "react-circular-progressbar";

import bedImage from '../assets/images/bed-plate.svg';
import exd1Image from '../assets/images/extruder-1.svg';
import exd2Image from '../assets/images/extruder-2.svg';

import 'react-circular-progressbar/dist/styles.css';

class ReceiveUpdate extends Component {
  componentDidUpdate() {

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
    if (file !== undefined) {
      return file.name;
    } else {
      return 'Getting the file name...'
    }
  }

  getTotalLayer = (layerCount) => {
    if (layerCount !== null) {
      return layerCount;
    } else {
      return "_";
    }
  }

  render() {
    const data = this.props.socketData;
    let jobName = this.getJobName(data.job.file) === null ? "No Job To Print" : this.getJobName(data.job.file);
    let totalLayer = this.getTotalLayer(data.job.layerCount);
    const timeTaken = this.formatTime(data.printProgress.printTime);
    const timeRemaining = this.formatTime();
    const currentState = (data.currentState !== null) ? data.currentState: "Checking the status...";
    const totalTime = data.estimatedPrintTime;
    const printProgress = !isNaN(data.printProgress.completion) ? (Math.round(data.printProgress.completion * 10) / 10) : "0";
    const currentLayer = data.printProgress.currentLayer;
    const tool0 = data.temps.tool0;
    const tool1 = data.temps.tool1;
    const bed = data.temps.bed;

    return (
      <div className="printing-container">
        <nav className="nav-bar">
          <h1 className="current-state">Ray is currently: {currentState}</h1>
        </nav>
        <div className="print-details">
          <div className="print-progress">
            <div className="name-percent flex-row">
              <span className="job-name">{jobName}</span>
              <span className="percent">{printProgress}%</span>
            </div>
            <progress max="100" value={printProgress} className="print-progress-bar"></progress>
          </div>
          <div className="layer-time-details flex-row">
            <div className="layers">
              <p>Layer</p>
              <p className="layer-count">{currentLayer} Of <span className="alert-text">{totalLayer}</span></p>
            </div>
            <div className="time">
              <p>Total Time Taken</p>
              <p className="time-value  alert-text">{timeTaken[0]}:{timeTaken[1]}:{timeTaken[2]}</p>
            </div>
            <div className="time">
              <p>Time Remaining</p>
              <p className="time-value  alert-text">{timeRemaining[0]}:{timeRemaining[1]}:{timeRemaining[2]}</p>
            </div>
          </div>
          <div className="temp-details flex-row">
            <div className="bed-temp temp-box">
              <img src={bedImage} alt="Bed" width="80" height="80"/>
              <p className="temps"><span className="alert-text">{bed.actual !== null ? bed.actual : "--"}&deg;</span> / {bed.target !== null ? bed.target : "--"}&deg;</p>
            </div>
            <div className="tool0-temp temp-box">
              <img src={exd1Image} alt="Bed" width="80" height="80"/>
              <p className="temps"><span className="alert-text">{tool0.actual !== null ? tool0.actual : "--"}&deg;</span> / {tool0.target !== null ? tool0.target : "--"}&deg;</p>
            </div>
            <div className="tool1-temp temp-box">
              <img src={exd2Image} alt="Bed" width="80" height="80"/>
              <p className="temps"><span className="alert-text">{tool1.actual !== null ? tool1.actual : "--"}&deg;</span> / {tool1.target !== null ? tool1.target : "--"}&deg;</p>
            </div>
          </div>
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
import React, { Component } from 'react';
import { connect } from "react-redux";

class ReceiveUpdate extends Component {
  componentDidUpdate() {

  }

  render() {
    // console.log(this.props.socketData);
    return (
      <div>
        <h1>Printer is: {this.props.socketData.currentState}</h1>
        <div>
          <p>Printing progress: {Math.round(this.props.socketData.printProgress.completion)}%</p>
        </div>
        <div>
          <p>The Bed Temperature is:</p>
          <p>Actual: {this.props.socketData.temps.bed.actual}</p>
          <p>Target: {this.props.socketData.temps.bed.target}</p>
        </div>
        <div>
          <p>The Extruder1 Temperature is:</p>
          <p>Actual: {this.props.socketData.temps.tool0.actual} </p>
          <p>Target: {this.props.socketData.temps.tool0.target}</p>
        </div>
        <div>
          <p>The Extruder2 Temperature is:</p>
          <p>Actual: {this.props.socketData.temps.tool1.actual}</p>
          <p>Target: {this.props.socketData.temps.tool1.target}</p>
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
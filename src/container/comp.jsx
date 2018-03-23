import React, { Component } from "react";
import {connect} from 'react-redux';

class Comp extends Component {
  componentDidUpdate() {
    console.log('This component got update');
  }

  render() {
    let heading;
    if (this.props.initialData) {
      heading = (
        <div>
          <p><b>UI_API_KEY is:</b> {this.props.initialData.data.uiApiKey}</p>
          <p><b>wsToken is:</b> {this.props.initialData.data.wsToken}</p>
        </div>
      );
    } else {
      heading = <h1>I have subscribed to State change but no updates yet :(</h1>
    }

    return (
      <div>
        {heading}
      </div>
    );
  }
}

/* We have subscribed for the updates from Store */
const mapStateToProps = (state) => {
  return {
    initialData: state.initialData.initialData
  }
};

export default connect(mapStateToProps)(Comp);
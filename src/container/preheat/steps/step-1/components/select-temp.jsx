import React from 'react';

import './select-temp.css';
import NumPad from 'react-numpad';


const selectTemp = (props) => {
  return (
    <div className="select-temp">
      <img src={props.image} alt="Tool" className="tool-img" width="72" height="72"/>
      <p className="tool-name">{props.name}</p>
      <div className="tool-temp">
        <p className="heading">{props.name} Temperature</p>
        <span className="unit">&#8451;</span>
        {/* <p className="temp-value">220 &#8451;</p> */}
        <NumPad.Number
          onChange={props.change}
          placeholder={'temp'}
          position='center'
          value={props.temp}
        />
      </div>
    </div>
  );
};

export default selectTemp;
import React from 'react';
import { NavLink } from 'react-router-dom';

import './step-3.css';
import Button from '../../../../components/button/button';
import finishIcon from '../../../../assets/images/finish-icon.svg';

const finish = (props) => {
  // console.log('isHeatingUP? :', props.heatingUp);
  return (
    <div className="preheat-step preheat--step-3">
      <img src={finishIcon} alt="Complete" width="176" height="176" className="complete-icon"/>
      <p className="complete-msg">Preheat Complete!</p>
      <Button classValue={'btn'} clicked={props.onFinish}>Finish</Button>
    </div>
  );
};

export default finish;
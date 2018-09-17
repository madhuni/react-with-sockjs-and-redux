import React from 'react';
import { NavLink, Route, Switch } from 'react-router-dom';
import CircularProgressbar from "react-circular-progressbar";
/* Styles for the 'CircularProgressBar' */
import 'react-circular-progressbar/dist/styles.css';

import './print-details.css';
import JobDetail from './components/job-detail/job-detail';
import Button from '../../../../components/button/button';
import ButtonDisable from '../../../../components/button/button-disable';
import NavLinkBtn from '../../../../components/nav-link-btn/nav-link-btn';

import InternalStorageIcon from '../../../../assets/images/hardisk-icon.svg'; 
import UsbStorageIcon from '../../../../assets/images/usb-icon.svg'; 

const printDetails = (props) => {
  let layerCount;
  let timeTaken;
  let timeRemaining;
  let printProgress;
  let jobName;

  if (props.currentLayer !== undefined && props.totalLayer !== undefined) {
    const currentLayer = props.currentLayer !== null ? props.currentLayer : '_';
    const totalLayer = props.totalLayer !== null ? props.totalLayer : '_';
    layerCount = currentLayer + ' Of ' + totalLayer;
  } else {
    layerCount = '_ Of _'; 
  }

  if (props.flags) {
    if ((props.flags.printing || props.flags.paused) && props.timeTaken !== null) {
      timeTaken = props.timeTaken[0] + ":" + props.timeTaken[1] + ":" + props.timeTaken[2];
    } else {
      timeTaken = "--:--:--";
    }
  
    if ((props.flags.printing || props.flags.paused) && props.timeRemaining !== null) {
      timeRemaining = props.timeRemaining[0] + ":" + props.timeRemaining[1] + ":" + props.timeRemaining[2];
    } else {
      timeRemaining = "--:--:--";
    }

    if (props.flags.printing || props.flags.paused) {
      printProgress = props.printProgress;
    } else {
      printProgress = 0;
    }

    if (props.flags.printing || props.flags.paused) {
      jobName = props.jobName ? props.jobName : 'No Job To Print';
    } else {
      jobName = 'No Job To Print'
    }
  }


  const printControls = (
    <div className="print-controls flex-row">
      <Button name={props.currentState === 'Paused' ? 'Resume' : 'Pause'} classValue={"btn"} clicked={props.pausePrint} />
      {props.currentState === 'Paused' ? 
        <ButtonDisable classValue="btn">Cancel Print</ButtonDisable> :
        <Button name={"Cancel Print"} classValue={"btn btn--danger"} clicked={props.cancelPrint} />
      }
    </div>
  );

  const storageControls = (
    <div className="storage-controls flex-row">
      <NavLink exact to='/internal-storage'>
        <NavLinkBtn>
          <img src={InternalStorageIcon} alt="Hardisk" width="56" height="56"/>
          <span>Internal</span>
        </NavLinkBtn>
      </NavLink>
      <NavLink exact to='/external-storage'>
        <NavLinkBtn>
          <img src={UsbStorageIcon} alt="Usb" width="56" height="56" />
          <span>External</span>
        </NavLinkBtn>
      </NavLink>
    </div>
  );

  return (
    <div className="printing-area flex-col">
      <div className="print-details">
        <p className="job-name">{jobName}</p>
        <CircularProgressbar className="print-progress" percentage={printProgress}/>
        <div className="layer-time-container flex-row">
          <JobDetail data={layerCount} type={"Layers"}/>
          <JobDetail data={timeTaken} type={"Time Taken"}/>
          <JobDetail data={timeRemaining} type={"Time Left"}/>
        </div>
      </div>
      { props.flags !== null ? (props.flags.printing || props.flags.paused ? printControls : storageControls) : null }
    </div>
  );
};

export default printDetails;
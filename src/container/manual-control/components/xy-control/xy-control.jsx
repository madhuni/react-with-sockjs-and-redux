import React from 'react';

import './xy-control.css';

import yBack from '../assets/images/y-plus.svg';
import xLeft from '../assets/images/x-plus.svg';
import yForward from '../assets/images/y-minus.svg';
import xRight from '../assets/images/x-minus.svg';
import home from '../assets/images/home.svg';

import Button from '../../../../components/button/button';

const xyControl = (props) => {
  return (
    <div className="xy-control-container">
      <table className="xy-controls">
        <tbody>
          <tr>
            <td></td>
            <td className="y-plus">
              <Button clicked={props.yBack}>
                <img className="control-btn-img" src={yBack} alt="Y-Back" width="82" height="82" />
              </Button>
            </td>
            <td></td>
          </tr>
          <tr>
            <td className="x-minus">
              <Button clicked={props.xRight}>
                <img className="control-btn-img" src={xLeft} alt="X-Left" width="82" height="82" />
              </Button>
            </td>
            <td className="xy-home">
              <Button clicked={props.home}>
                <img className="control-btn-img" src={home} alt="Home" width="82" height="82" />
              </Button>
            </td>
            <td className="x-plus">
              <Button clicked={props.xLeft}>
                <img className="control-btn-img" src={xRight} alt="X-Right" width="82" height="82" />
              </Button>
            </td>
          </tr>
          <tr>
            <td></td>
            <td className="y-minus">
              <Button clicked={props.yForward}>
                <img className="control-btn-img" src={yForward} alt="Y-Forward" width="82" height="82" />
              </Button>
            </td>
            <td></td>
          </tr>
        </tbody>
			</table>
    </div>
  );
};

export default xyControl;
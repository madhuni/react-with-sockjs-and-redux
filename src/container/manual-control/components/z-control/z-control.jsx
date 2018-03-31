import React from 'react';

import './z-control.css';

import home from '../assets/images/home.svg';
import zUp from '../assets/images/z-plus.svg';
import zDown from '../assets/images/z-minus.svg';

import Button from '../../../../components/button/button';

const zControl = (props) => {
  return (
    <div className="z-container">
      <table className="z-controls">
        <tbody>
          <tr>
            <td>
              <Button clicked={props.zUp}>
                <img className="control-btn-img" src={zUp} alt="Z-Plus" width="82" height="82" />
              </Button>
            </td>
          </tr>
          <tr>
            <td>
              <Button clicked={props.home}>
                <img className="control-btn-img" src={home} alt="Home" width="82" height="82" />
              </Button>
            </td>
          </tr>
          <tr>
            <td>
              <Button clicked={props.zDown}>
                <img className="control-btn-img" src={zDown} alt="Z-Minus" width="82" height="82" />
              </Button>
            </td>
          </tr>
        </tbody>
			</table>
    </div>
  );
};

export default zControl;
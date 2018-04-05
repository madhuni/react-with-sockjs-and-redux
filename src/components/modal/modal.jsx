import React from 'react';

import './modal.css';

import Button from '../button/button';

const modal = (props) => {
  return (
    <div className="modal" onClick={(event) => event.stopPropagation()}>
      <p className="filename">{props.filename}</p>
      <p className="question">Do you want to continue print?</p>
      <div className="action-btns">
        <Button classValue={'btn btn--danger'} clicked={props.delete} name={"Delete"}/>
        <Button classValue={'btn btn--green'} clicked={props.print} name={"Print"}/>
      </div>
    </div>
  );
};

export default modal;
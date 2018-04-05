import React from 'react';

import './modal.css';

import Button from '../button/button';

const modal = (props) => {
  const modalClass = ['modal'];
  if (props.modalOpen) {
    modalClass.push('modal-open');
  } else {
    modalClass.push('modal-close');
  }
  return (
    <div className={modalClass.join(" ")} onClick={(event) => event.stopPropagation()}>
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
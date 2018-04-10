import React from 'react';

import './modal.css';

import Button from '../button/button';
import ButtonDisabled from '../button/button-disable';

const modal = (props) => {
  const modalClass = ['modal'];
  if (props.modalOpen) {
    modalClass.push('modal-open');
  } else {
    modalClass.push('modal-close');
  }

  const leftBtn = props.actions.leftBtn;
  const rightBtn = props.actions.rightBtn;

  let actionBtns;

  if (props.origin === 'External Storage') {
    actionBtns = (
      <div>
        {!props.isBtnDisabled ? 
          <Button classValue={'btn ' + leftBtn.classValue} clicked={props.leftBtnClick} name={leftBtn.name} /> :
          <ButtonDisabled classValue="btn">{leftBtn.name}</ButtonDisabled>
        }
        {props.isBtnDisabled ?
          <Button classValue={'btn ' + rightBtn.classValue} clicked={props.rightBtnClick} name={rightBtn.name} /> :
          <ButtonDisabled classValue="btn">{rightBtn.name}</ButtonDisabled>
        }
      </div>
    );
  } else {
    actionBtns = (
      <div>
        <Button classValue={'btn ' + leftBtn.classValue} clicked={props.leftBtnClick} name={leftBtn.name} />
        <Button classValue={'btn ' + rightBtn.classValue} clicked={props.rightBtnClick} name={rightBtn.name} />
      </div>
    );
  }

  return (
    <div className={modalClass.join(" ")} onClick={(event) => event.stopPropagation()}>
      <p className="filename">{props.content}</p>
      <p className="question">{props.question}</p>
      <div className="action-btns">
        {actionBtns}
      </div>
    </div>
  );
};

export default modal;
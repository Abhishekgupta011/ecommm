import React from "react";
import  ReactDOM  from "react-dom";
import classes from './Modal.module.css';
const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onClose}></div>;
};

const ModalOverlays = (props) => {
  return <div className={classes.modal_overlay}>{props.children}</div>;
};

const portalElement = document.getElementById("overlays");

const Modal = (props) => {
  return (
    <div>
      {ReactDOM.createPortal(<Backdrop onClose={props.onClose}/>, portalElement)}
      {ReactDOM.createPortal(
        <ModalOverlays>{props.children}</ModalOverlays>,
        portalElement
      )}
    </div>
  );
};
export default Modal;

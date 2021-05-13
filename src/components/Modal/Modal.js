import Portal from "components/Portal/Portal";
import React, { useRef } from "react";
import { overlay, modal } from "./Modal.module.scss";

const Modal = ({ isVisible, onClick, heading, children }) => {
  const dialogRef = useRef(null);
  return (
    <Portal id="dialog">
      {isVisible && (
        <>
          <div className={overlay} onClick={onClick} role="presentation"></div>
          <div ref={dialogRef} className={modal}>
            <h2>{heading}</h2>
            {children}
          </div>
        </>
      )}
    </Portal>
  );
};

export default Modal;

import Portal from "components/Portal/Portal";
import React, { useRef } from "react";
import { overlay, modal, content } from "./Modal.module.scss";

const Modal = ({ isVisible, onClick, heading, children }) => {
  const dialogRef = useRef(null);
  return (
    <Portal id="portal">
      {isVisible && (
        <>
          <div className={overlay} onClick={onClick} role="presentation"></div>
          <div ref={dialogRef} className={modal} role="dialog">
            <h2>{heading}</h2>
            <div className={content}>{children}</div>
          </div>
        </>
      )}
    </Portal>
  );
};

export default Modal;

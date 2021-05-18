import Button from "components/Button/Button";
import Portal from "components/Portal/Portal";
import React, { useEffect, useRef } from "react";
import { overlay, modal, content, closeBtn } from "./Modal.module.scss";
import { ReactComponent as Close } from "assets/close.svg";

/* --------------------------------- 모달 컴포넌트 -------------------------------- */

const Modal = ({ isVisible, onClick, heading, children }) => {
  const dialogRef = useRef(null);

  // 모달이 열려있을때는 스크롤 처리가 되지 않도록 설정
  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isVisible]);

  // 접근성 관련
  useEffect(() => {
    if (isVisible) {
      // 모달에 포커스가 갈수있도록 탭 인덱스 속성 부여 및 포커스 처리
      const dialogNode = dialogRef.current;
      dialogNode.setAttribute("tabIndex", -1);
      dialogNode.focus();

      // 모달뒤 영역이 보이스리더기에 읽히지 않도록 처리
      const rootNode = document.getElementById("root");
      rootNode.setAttribute("aria-hidden", true);
      rootNode.style.userSelect = "none";

      const handleFocusTrap = (e) => {
        //포커스 가능한 노드들 선택
        const dialogNode = dialogRef.current;
        const focusableNodeList = dialogNode.querySelectorAll("input, button");

        // 포커스 순환을 위해 첫 번째 포커스 요소와 마지막 포커스 요소 저장
        const firstFocusNode = focusableNodeList[0];
        const lastFocusNode = focusableNodeList[focusableNodeList.length - 1];

        // 첫 번째 포커스 요소에서 shift + tab시 마지막 요소로 이동
        if (e.target === firstFocusNode && e.shiftKey && e.key === "Tab") {
          e.preventDefault();
          lastFocusNode.focus();
        }

        // 마지막 포커스 요소에서 tab을 누르면 첫 번째 포커스 요소로 이동
        if (e.target === lastFocusNode && e.key === "Tab") {
          e.preventDefault();
          firstFocusNode.focus();
        }
      };

      window.addEventListener("keydown", handleFocusTrap);

      // 클린업
      return () => {
        dialogNode.removeAttribute("tabIndex");
        rootNode.removeAttribute("aria-hidden");
        window.removeEventListener("keydown", handleFocusTrap);
        rootNode.style.userSelect = "auto";
      };
    }
  }, [isVisible]);

  return (
    <Portal id="portal">
      {isVisible && (
        <>
          <div className={overlay} onClick={onClick} role="presentation"></div>
          <div
            ref={dialogRef}
            className={modal}
            role="dialog"
            aria-labelledby={heading}
          >
            <h2>{heading}</h2>
            <div className={content}>{children}</div>
            <Button
              onClick={onClick}
              aria-label="모달 닫기"
              className={closeBtn}
            >
              <Close title="닫기" />
            </Button>
          </div>
        </>
      )}
    </Portal>
  );
};

export default Modal;

import React from "react";
import { error } from "./Error.module.scss";
import { ReactComponent as Close } from "assets/close.svg";
import Button from "components/Button/Button";

const Error = ({ message, onClick }) => {
  return (
    <div className={error} role="alert">
      {message}
      <Button onClick={onClick} aria-label="에러 닫기">
        <Close title="닫기" />
      </Button>
    </div>
  );
};

export default Error;

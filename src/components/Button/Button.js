import React from "react";
import { button, primaryBtn, secondaryBtn } from "./Button.module.scss";

/* --------------------------------- 버튼 컴포넌트 -------------------------------- */

const Button = ({
  type = "button",
  primary,
  onClick,
  children,
  bold,
  $width,
  $height,
  $fontSize,
  className,
  ...restProps
}) => {
  const customSize = {
    width: $width,
    height: $height,
    fontSize: $fontSize,
    fontWeight: bold ? "bold" : "normal",
  };
  return (
    <button
      type={type}
      className={`${button} ${
        primary ? primaryBtn : secondaryBtn
      } ${className}`}
      style={customSize}
      onClick={onClick}
      {...restProps}
    >
      {children}
    </button>
  );
};

export default Button;

import React from "react";
import { button, primaryBtn, secondaryBtn } from "./Button.module.scss";

const Button = ({
  type = "button",
  primary,
  onClick,
  children,
  $width,
  $height,
  className,
  ...restProps
}) => {
  const customSize = {
    width: $width,
    height: $height,
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

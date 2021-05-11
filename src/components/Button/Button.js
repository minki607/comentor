import React from "react";
import { button, primaryBtn } from "./Button.module.scss";

const Button = ({
  type = "button",
  primary = true,
  onClick,
  children,
  $width,
  $height,
  ...restProps
}) => {
  const customSize = {
    width: $width,
    height: $height,
  };
  return (
    <button
      type={type}
      className={`${button} ${primaryBtn}`}
      style={customSize}
      {...restProps}
    >
      {children}
    </button>
  );
};

export default Button;

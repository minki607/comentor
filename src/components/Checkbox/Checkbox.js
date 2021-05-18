import React from "react";
import { container, input, label } from "./Checkbox.module.scss";

/* ------------------------------- 체크 박스 컴포넌트 ------------------------------- */

const Checkbox = ({ id, children, isChecked, value, ...restProps }) => {
  return (
    <div className={container}>
      <input
        type="checkbox"
        id={id}
        checked={isChecked}
        className={input}
        value={value}
        {...restProps}
      />
      <label htmlFor={id} className={label}>
        {children}
      </label>
    </div>
  );
};

export default Checkbox;

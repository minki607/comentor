import React from "react";
import { selectBox } from "./SelectOption.module.scss";

const SelectOption = ({ label, children, value, onChange }) => {
  return (
    <div className={selectBox}>
      <label>
        {label}
        {/* eslint-disable-next-line jsx-a11y/no-onchange */}
        <select value={value} onChange={onChange}>
          {children}
        </select>
      </label>
    </div>
  );
};

export default SelectOption;

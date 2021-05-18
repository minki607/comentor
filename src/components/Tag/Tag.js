import React from "react";
import { tag } from "./Tag.module.scss";

/* --------------------------------- 태그 컴포넌트 -------------------------------- */

const Tag = ({ children }) => {
  return <div className={tag}>{children}</div>;
};

export default Tag;

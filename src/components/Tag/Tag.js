import React from "react";
import { tag } from "./Tag.module.scss";

const Tag = ({ children }) => {
  return <div className={tag}>{children}</div>;
};

export default Tag;

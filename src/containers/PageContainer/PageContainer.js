import React from "react";
import { page } from "./PageContainer.module.scss";

const PageContainer = ({ children }) => {
  return <div className={page}>{children}</div>;
};

export default PageContainer;

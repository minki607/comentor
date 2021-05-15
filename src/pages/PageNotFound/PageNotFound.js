import React from "react";
import { page } from "./PageNotFound.module.scss";

const PageNotFound = () => {
  return (
    <div className={page}>
      <h2>요청하신 페이지를 찾을수없습니다.</h2>
    </div>
  );
};

export default PageNotFound;

import React from "react";
import { feedSingle } from "./SingleFeedContent.Module.scss";

const SingleFeedContent = ({ children }) => {
  return <div className={feedSingle}>{children}</div>;
};

export default SingleFeedContent;

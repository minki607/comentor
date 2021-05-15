import React from "react";
import { feedDetail } from "./SingleFeedContent.Module.scss";

const SingleFeedContent = ({ feed: { title, contents, created_at } = {} }) => {
  return (
    <article className={feedDetail}>
      <h2>{title}</h2>
      <p>{contents}</p>
      <time>{created_at && created_at.split("T")[0]}</time>
    </article>
  );
};

export default SingleFeedContent;
